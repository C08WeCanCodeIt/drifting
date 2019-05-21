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
const sqlUpdate = "update users Set userType=? Where id=?"
const sqlDel = "delete from users where id=?"

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

// "update user Set type=?, status=? Where id=?"
//Update updates the user with `id` with values in `updates`
func (ms *MySQLStore) Update(id int64, updates *Updates) (*User, error) {
	toUpdate := ""

	// updating both member status and member type
	if len(updates.Type) > 0 && len(updates.Status) > 0 {
		toUpdate = updates.Type + "+" + updates.Status

	} else {
		currUser, err := ms.GetByID(id)
		if err != nil {
			return nil, fmt.Errorf("User not found in database: %v", err)
		}
		currTypeStatus := strings.Split(currUser.Type, "+")

		if len(updates.Type) > 0 { //updating only member type
			currTypeStatus[0] = updates.Type
		}

		if len(updates.Status) > 0 { //update on member status
			currTypeStatus[1] = updates.Status
		}
		toUpdate = currTypeStatus[0] + "+" + currTypeStatus[1]
	}

	results, err := ms.db.Exec(sqlUpdate, toUpdate, id)
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
		return nil, ErrUserNotFound
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
/* func (ms *MySQLStore) GetAll() ([]*User, error) {
	rows, err := ms.db.Query(sqlSelectAll)

	users := []*User{}

	if err != nil {
		return nil, err
	}

	for rows.Next() {
		user := &User{}
		if err := rows.Scan(&user.ID, &user.UserName, &user.PassHash, &user.Type); err != nil {
			if err == sql.ErrNoRows {
				return nil, ErrUserNotFound
			}
			return nil, fmt.Errorf("scanning: %v", err)
		}

		users = append(users, user)
	}
	return users, nil
} */

func (ms *MySQLStore) GetAll() ([]*User, error) {
	rows, err := ms.db.Query(sqlSelectAll)
	columns, _ := rows.Columns()

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

			finalColumns := ""
			for i := 0; i < len(columns); i++ {
				finalColumns = finalColumns + columns[i] + " ! "
			}

			return nil, fmt.Errorf(" "+finalColumns+" scanning: %v", err)
		}

		users = append(users, user)
	}

	return users, nil

}

//const sqlSelectType = "select * from users where userType=?"

//find users of a specific type
//func (ms *MySQLStore) GetByUsertype(usertype string) ([]*User, error) {
/* 	rows, err := ms.db.Query(sqlSelectType, usertype)

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
   	return users, nil */
//return nil, nil
//}

//const sqlSelectStatus = "select * from users where userType=?"

//find users of a specific status
//func (ms *MySQLStore) GetByUserstatus(userstatus string) ([]*User, error) {
/*	rows, err := ms.db.Query(sqlSelectStatus, userstatus)

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
	return users, nil */
//return nil, nil
//}
