package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"path"
	"strings"
	"time"

	"github.com/drifting/servers/gateway/models/users"
	"github.com/drifting/servers/gateway/sessions"
	"golang.org/x/crypto/bcrypt"
)

//NewHandlerContext constructs a new HandlerContext
func NewHandlerContext(key string, userStore users.Store, sessionStore sessions.Store) *HandlerContext {
	if userStore == nil {
		panic("UserStore is nil")
	} else if sessionStore == nil {
		panic("SessionStore is nil")
	}
	return &HandlerContext{
		Key:          key,
		UserStore:    userStore,
		SessionStore: sessionStore,
	}
}

//UsersHandler handles requests for the "users" resource (sign up)
func (ctx *HandlerContext) UsersHandler(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	if r.Header.Get("Content-Type") != "application/json" {
		http.Error(w, "Request body must be in JSON", http.StatusUnsupportedMediaType)
		return
	}

	// gets the user info
	newUser := users.NewUser{}
	err := json.NewDecoder(r.Body).Decode(&newUser)
	if err != nil {
		http.Error(w, "New user could not be decoded: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// check if username is empty
	if len(newUser.UserName) == 0 {
		http.Error(w, "No username inputted", http.StatusBadRequest)
		return
	}

	// check if username has strings
	if strings.Contains(newUser.UserName, " ") {
		http.Error(w, "Username cannot have spaces", http.StatusBadRequest)
		return
	}

	// check if password is less than 6 characters
	if len(newUser.Password) < 6 || len(newUser.PasswordConf) < 6 {
		http.Error(w, "Password or Password confirmation less than 6 characters", http.StatusBadRequest)
		return
	}

	// check if password confs equals
	if newUser.Password != newUser.PasswordConf {
		http.Error(w, "Password and password confirmation do not match", http.StatusBadRequest)
		return
	}

	// check if username already exists
	checkUser, err := ctx.UserStore.GetByUserName(newUser.UserName)
	if err == nil && checkUser != nil {
		http.Error(w, "User with username: "+newUser.UserName+" already exists ", http.StatusUnprocessableEntity)
		return
	}

	// decodes to new user
	user, err := newUser.ToUser()
	if err != nil {
		http.Error(w, "New user could not be encoded to a user: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// inserts into database
	dbUser, err := ctx.UserStore.Insert(user)
	if err != nil {
		http.Error(w, "User could not be inserted into database: "+err.Error(), http.StatusInternalServerError)
		return
	}

	_, err = sessions.BeginSession(ctx.Key, ctx.SessionStore, SessionState{StartTime: time.Now(), User: user}, w)
	if err != nil {
		http.Error(w, "Could not begin new session", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	err = json.NewEncoder(w).Encode(dbUser)
	if err != nil {
		http.Error(w, "Could not encode user:"+err.Error(), http.StatusInternalServerError)
		return
	}

}

//SpecificUserHandler handles requests for a specific user (getting specific info or updating)
func (ctx *HandlerContext) SpecificUserHandler(w http.ResponseWriter, r *http.Request) {

	sessionState := &SessionState{}
	_, err := sessions.GetState(r, ctx.Key, ctx.SessionStore, sessionState)
	if err != nil {
		http.Error(w, "Unauthorized user", http.StatusUnauthorized)
		return
	}

	//TODO: me path: gets personal stuff
	//TODO: Get rid of ability to see other users
	id := path.Base(r.URL.Path)
	var username string
	if id == "me" {
		username = sessionState.User.UserName
	} else {
		username = id
	}

	if r.Method == http.MethodGet {

		// username not match current username logged in
		// user is not a mod
		// user is not a admin
		if username != sessionState.User.UserName && !strings.Contains(sessionState.User.Type, "admin") && !strings.Contains(sessionState.User.Type, "mod") {
			http.Error(w, "Unauthorized user", http.StatusUnauthorized)
			return
		}

		user, err := ctx.UserStore.GetByUserName(username)
		if err != nil {
			http.Error(w, "User not found: "+err.Error(), http.StatusNotFound)
			return
		}

		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)

		err = json.NewEncoder(w).Encode(user)
		if err != nil {
			http.Error(w, "User could not be encoded", http.StatusInternalServerError)
			return
		}

	} else if r.Method == http.MethodPatch {

		// check if they're a admin or mod
		if !strings.Contains(sessionState.User.Type, "admin") && !strings.Contains(sessionState.User.Type, "mod") {
			http.Error(w, "Unauthorized user", http.StatusUnauthorized)
			return
		}

		// get the user information
		dbUser, err := ctx.UserStore.GetByUserName(username)
		if err != nil {
			http.Error(w, "User not found in DB", http.StatusNotFound)
			return
		}

		userUpdate := &users.Updates{}
		err = json.NewDecoder(r.Body).Decode(userUpdate)
		if err != nil {
			http.Error(w, "An error occured while decoding the user updates: "+err.Error(), http.StatusInternalServerError)
			return
		}

		err = dbUser.ApplyUpdates(userUpdate)
		if err != nil {
			http.Error(w, "Updates could not be applied to the user: "+err.Error(), http.StatusInternalServerError)
			return
		}

		updatedUser, err := ctx.UserStore.Update(dbUser.ID, userUpdate)
		if err != nil {
			http.Error(w, "Updates could not be applied to the user: "+err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)

		err = json.NewEncoder(w).Encode(updatedUser)
		if err != nil {
			http.Error(w, "Updated user could not be encoded: "+err.Error(), http.StatusInternalServerError)
			return
		}
	} else {
		http.Error(w, "Method type not supported", http.StatusMethodNotAllowed)
		return
	}

}

//SessionsHandler handles requests for the sessions resource (sign in)
func (ctx *HandlerContext) SessionsHandler(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodPost {
		http.Error(w, "Method type not supported", http.StatusMethodNotAllowed)
		return
	}

	if r.Header.Get("Content-Type") != "application/json" {
		http.Error(w, "Request body must be in JSON", http.StatusUnsupportedMediaType)
		return
	}

	userCred := &users.Credentials{}
	err := json.NewDecoder(r.Body).Decode(userCred)
	if err != nil {
		http.Error(w, "Could not decode user credentials", http.StatusBadRequest)
		return
	}

	user, err := ctx.UserStore.GetByUserName(userCred.UserName)

	if err != nil {
		bcrypt.GenerateFromPassword(user.PassHash, 13) // Ensure that process takes time
		http.Error(w, "Unauthorized user", http.StatusUnauthorized)
		return
	}

	if user.IsSuspended == true {
		http.Error(w, "Current user has been suspended from the site. Please contact a moderator or administrator if you think there has been a mistake.", http.StatusUnauthorized)
		return
	}

	err = user.Authenticate(userCred.Password)
	if err != nil {
		http.Error(w, "Unauthorized user", http.StatusUnauthorized)
		return
	}

	_, err = sessions.BeginSession(ctx.Key, ctx.SessionStore, SessionState{StartTime: time.Now(), User: user}, w)
	if err != nil {
		http.Error(w, "Could not begin a new session", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	err = json.NewEncoder(w).Encode(user)
	if err != nil {
		http.Error(w, "Could not encode user", http.StatusInternalServerError)
		return
	}

}

//SpecificSessionHandler handles requests related to specific authenticated sessions (sign out)
func (ctx *HandlerContext) SpecificSessionHandler(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodDelete {
		http.Error(w, "Method type not supported", http.StatusMethodNotAllowed)
		return
	}

	if path.Base(r.URL.Path) != "mine" {
		http.Error(w, "Users can only delete their own sessions", http.StatusForbidden)
		return
	}

	_, err := sessions.EndSession(r, ctx.Key, ctx.SessionStore)
	if err != nil {
		http.Error(w, "An error occured while ending the session", http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "text/plain")
	w.Write([]byte("signed out"))
	w.WriteHeader(http.StatusOK)
}

//GetAllUsersHandler gets all the users from the db
func (ctx *HandlerContext) GetAllUsersHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method type not supported", http.StatusMethodNotAllowed)
		return
	}

	sessionState := &SessionState{}
	_, err := sessions.GetState(r, ctx.Key, ctx.SessionStore, sessionState)
	if err != nil {
		http.Error(w, "Unauthorized user", http.StatusUnauthorized)
		return
	}

	// check if they're a admin or mod
	if !strings.Contains(sessionState.User.Type, "admin") && !strings.Contains(sessionState.User.Type, "mod") {
		http.Error(w, "Unauthorized user", http.StatusUnauthorized)
		return
	}

	//by default: get all the users in the db

	id := path.Base(r.URL.Path)
	fmt.Print(id)
	users, err := ctx.UserStore.GetAll()

	switch id {
	case "warn":
		users, err = ctx.UserStore.GetByUserStatus("warned")
	case "ban":
		users, err = ctx.UserStore.GetByUserStatus("banned")
	case "valid":
		users, err = ctx.UserStore.GetByUserStatus("valid")
	case "admin":
		users, err = ctx.UserStore.GetByUserType(id)
	case "mod":
		users, err = ctx.UserStore.GetByUserType(id)
	case "member":
		users, err = ctx.UserStore.GetByUserType(id)
	}

	if err != nil {
		http.Error(w, "Couldn't retrieve users: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	err = json.NewEncoder(w).Encode(users)
	if err != nil {
		http.Error(w, "Users list could not be encoded: "+err.Error(), http.StatusInternalServerError)
		return
	}
}
