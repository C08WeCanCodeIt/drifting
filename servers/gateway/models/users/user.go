package users

import (
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"strings"
)

//bcryptCost is the default bcrypt cost to use when hashing passwords
var bcryptCost = 13

//User represents a user account in the database
type User struct {
	ID       int64  `json:"id"`
	PassHash []byte `json:"-"` //never JSON encoded/decoded
	UserName string `json:"userName"`
	Type     string `json:"type"` //never JSON encoded/decoded
	Status   string `json:"status"`
}

//Credentials represents user sign-in credentials
type Credentials struct {
	UserName string `json:"userName"`
	Password string `json:"password"`
}

//NewUser represents a new user signing up for an account
type NewUser struct {
	UserName     string `json:"userName"`
	Password     string `json:"password"`
	PasswordConf string `json:"passwordConf"`
	Type         string `json:"type"`
	Status       string `json:"status"`
}

//Updates for changing password
type Updates struct {
	UserName string `json:"userName"`
	Type     string `json:"type"`
	Status   string `json:"status"`
}

//Validate validates the new user and returns an error if
//any of the validation rules fail, or nil if its valid
func (nu *NewUser) Validate() error {

	if len(nu.UserName) == 0 {
		return fmt.Errorf("Username cannot be empty")
	} else if strings.Contains(nu.UserName, " ") {
		return fmt.Errorf("Username cannot contain any spaces")
	} else if len(nu.Password) < 6 {
		return fmt.Errorf("Password cannot have less than 6 characters")
	} else if nu.Password != nu.PasswordConf {
		return fmt.Errorf("Passwords do not match")
	}
	return nil
}

//ToUser converts the NewUser to a User, setting the
//PhotoURL and PassHash fields appropriately
func (nu *NewUser) ToUser() (*User, error) {

	if err := nu.Validate(); err != nil {
		return nil, err
	}

	userType := ""
	if len(nu.Type) == 0 {
		userType = "member"
	} else {
		userType = strings.ToLower(nu.Type)
	}

	/* 	userStatus := ""
	   	if len(nu.Status) == 0 {
	   		userType = "validated"
	   	} else {
	   		userType = strings.ToLower(nu.Status)
	   	} */

	user := &User{
		UserName: nu.UserName,
		Type:     userType,
		//Status:   userStatus,
	}
	user.SetPassword(nu.Password)
	return user, nil
}

//SetPassword hashes the password and stores it in the PassHash field
func (u *User) SetPassword(password string) error {
	hashPass, err := bcrypt.GenerateFromPassword([]byte(password), bcryptCost)

	if err == nil {
		u.PassHash = hashPass
	}

	return err
}

//Authenticate compares the plaintext password against the stored hash
//and returns an error if they don't match, or nil if they do
func (u *User) Authenticate(password string) error {
	if err := bcrypt.CompareHashAndPassword(u.PassHash, []byte(password)); err != nil {
		return err
	}
	return nil
}

//ApplyUpdates applies the updates to the user. An error
//is returned if the updates are invalid
func (u *User) ApplyUpdates(updates *Updates) error {
	//TODO: set the fields of `u` to the values of the related
	//field in the `updates` struct

	// both status and type are empty
	if len(updates.Type) == 0 && len(updates.Status) == 0 {
		return fmt.Errorf("no changes, since updates are empty")
	}

	if len(updates.Type) > 0 {
		u.Type = updates.Type
	}

	if len(updates.Status) > 0 {
		u.Status = updates.Status
	}

	return nil
}
