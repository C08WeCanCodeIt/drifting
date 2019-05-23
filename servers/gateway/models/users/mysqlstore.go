package users

import (
	"database/sql"
	"fmt"
	"strings"
)

const sqlInsertTask = "insert into users (userName, passHash, userType) values (?,?,?)"
const sqlSelectAll = "select * from users"
const sqlSelectByID = sqlSelectAll + " where id=?"
const sqlSelectByUsername = sqlSelectAll + " where userName=?"
const sqlDel = "delete from users where id=?"
const sqlSelectType = "select * from users where userType like ?"
const sqlSelectWarn = "select * from users where userType=?"
const sqlSelectIsSuspended = "select * from users where isSuspended=?"
const sqlUpdateQuery = "update users Set userType=?, isSuspended=? where id=?"

//MySQLStore represents a user.Store backed by mySQL
type MySQLStore struct {
	//DB pointer to be used to talk to SQL store
	db *sql.DB
}

//NewMySQLStore constructs a new MySQLStore
func NewMySQLStore(db *sql.DB) *MySQLStore {
	//initialize and return a new MySQLStore struct
	if db == nil {
		panic("nil database pointer")
	}
	return &MySQLStore{db}
}

//Store implementation

//Insert inserts the `user` into the store
func (ms *MySQLStore) Insert(user *User) (*User, error) {

	res, err := ms.db.Exec(sqlInsertTask, user.UserName, user.PassHash, user.Type)
	if err != nil {
		fmt.Printf("error inserting new row: %v\n", err)
		return nil, err
	}
	//get the auto-assigned ID for the new row
	id, err := res.LastInsertId()
	if err != nil {
		fmt.Printf("error getting new ID: %v\n", id)
		return nil, err
	}

	user.ID = id
	return user, nil
}

//Update updates the user with `id` with values in `updates`
func (ms *MySQLStore) Update(id int64, updates *Updates) (*User, error) {
	if len(updates.Type) == 0 && len(updates.Status) == 0 {
		return nil, fmt.Errorf("No values inserted, cannot update")
	}

	currUser, err := ms.GetByID(id)
	if err != nil {
		return nil, ErrUserNotFound
	}

	currType := currUser.Type
	currStatus := currUser.IsSuspended

	// if status is updated
	if len(updates.Status) > 0 {
		switch updates.Status {
		case "warn":
			if !strings.Contains(currType, "!") {
				currType = currType + "!"
			}
		case "unwarn":
			currType = strings.Replace(currType, "!", "", 1)
		case "ban":
			currStatus = true
		case "unban":
			currStatus = false
		}
	}

	results, err := ms.db.Exec(sqlUpdateQuery, currType, currStatus, id)
	if err != nil {
		return nil, fmt.Errorf("updating: %v", err)
	}

	affected, err := results.RowsAffected()
	if err != nil {
		return nil, fmt.Errorf("getting rows affected: %v", err)
	}

	//if no rows were affected, then the requested
	//ID was not in the database
	if affected == 0 {
		return nil, fmt.Errorf("No changes made")
	}

	return ms.GetByID(id)
}

//GetByID gets the user details with the specified `id`
func (ms *MySQLStore) GetByID(id int64) (*User, error) {
	row := ms.db.QueryRow(sqlSelectByID, id)
	user := &User{}

	if err := row.Scan(&user.ID, &user.UserName, &user.PassHash, &user.Type, &user.IsSuspended); err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrUserNotFound
		}
		return nil, fmt.Errorf("scanning: %v", err)
	}
	return user, nil
}

//GetByUserName gets the user details with the specified `id`
func (ms *MySQLStore) GetByUserName(username string) (*User, error) {
	row := ms.db.QueryRow(sqlSelectByUsername, username)
	user := &User{}

	if err := row.Scan(&user.ID, &user.UserName, &user.PassHash, &user.Type, &user.IsSuspended); err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrUserNotFound
		}
		return nil, fmt.Errorf("scanning: %v", err)
	}
	return user, nil
}

//Delete deletes the user with the give `id`
func (ms *MySQLStore) Delete(id int64) error {
	_, err := ms.db.Exec(sqlDel, id)
	if err != nil {
		return err
	}
	return nil
}

//GetAll gets all the users from the db
//send array of strings
func (ms *MySQLStore) GetAll() ([]*User, error) {
	rows, err := ms.db.Query(sqlSelectAll)
	//columns, _ := rows.Columns()

	users := []*User{}

	if err != nil {
		return nil, err
	}

	for rows.Next() {
		user := &User{}
		if err := rows.Scan(&user.ID, &user.UserName, &user.PassHash, &user.Type, &user.IsSuspended); err != nil {
			if err == sql.ErrNoRows {
				return nil, ErrUserNotFound
			}
			return nil, fmt.Errorf("scanning: %v", err)
		}

		users = append(users, user)
	}

	return users, nil

}

//find users of a specific type
func (ms *MySQLStore) GetByUserType(usertype string) ([]*User, error) {
	rows, err := ms.db.Query(sqlSelectType, usertype+"%")

	users := []*User{}

	if err != nil {
		return nil, err
	}

	for rows.Next() {
		user := &User{}
		if err := rows.Scan(&user.ID, &user.UserName, &user.PassHash, &user.Type, &user.IsSuspended); err != nil {
			if err == sql.ErrNoRows {
				return nil, ErrUserNotFound
			}
			return nil, fmt.Errorf("scanning: %v", err)
		}

		users = append(users, user)
	}
	return users, nil
}

//find users of a specific status
func (ms *MySQLStore) GetByUserStatus(userstatus string) ([]*User, error) {
	if userstatus == "warned" { //get all users with warnings
		rows, err := ms.db.Query(sqlSelectWarn, "%!")

		users := []*User{}

		if err != nil {
			return nil, err
		}

		for rows.Next() {
			user := &User{}
			if err := rows.Scan(&user.ID, &user.UserName, &user.PassHash, &user.Type, &user.IsSuspended); err != nil {
				if err == sql.ErrNoRows {
					return nil, ErrUserNotFound
				}
				return nil, fmt.Errorf("scanning: %v", err)
			}

			users = append(users, user)
		}
		return users, nil

	} else if userstatus == "banned" { //get all banned users

		rows, err := ms.db.Query(sqlSelectIsSuspended, true)

		users := []*User{}

		if err != nil {
			return nil, err
		}

		for rows.Next() {
			user := &User{}
			if err := rows.Scan(&user.ID, &user.UserName, &user.PassHash, &user.Type, &user.IsSuspended); err != nil {
				if err == sql.ErrNoRows {
					return nil, ErrUserNotFound
				}
				return nil, fmt.Errorf("scanning: %v", err)
			}

			users = append(users, user)
		}
		return users, nil

	} else { //get all valid users
		rows, err := ms.db.Query(sqlSelectIsSuspended, false)

		users := []*User{}

		if err != nil {
			return nil, err
		}

		for rows.Next() {
			user := &User{}
			if err := rows.Scan(&user.ID, &user.UserName, &user.PassHash, &user.Type, &user.IsSuspended); err != nil {
				if err == sql.ErrNoRows {
					return nil, ErrUserNotFound
				}
				return nil, fmt.Errorf("scanning: %v", err)
			}

			users = append(users, user)
		}
		return users, nil
	}

}
