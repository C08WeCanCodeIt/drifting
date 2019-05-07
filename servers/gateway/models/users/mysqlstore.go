package users

import (
	"database/sql"
	"fmt"
)

const sqlInsertTask = "insert into users (userName, passHash, userType, userStatus) values (?,?,?,?)"
const sqlSelectAll = "select * from users"
const sqlSelectByID = sqlSelectAll + " where id=?"
const sqlSelectByUsername = sqlSelectAll + " where userName=?"
const sqlUpdate = "update user Set userType=?, userStatus=? Where id=?"
const sqlUpdateStatus = "update users set userStatus=? where id=?"
const sqlUpdateType = "update users set userType=? where id=?"
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

	res, err := ms.db.Exec(sqlInsertTask, user.PassHash, user.UserName, user.Type, user.Status)
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

// "update user Set userType=?, userStatus=? Where id=?"
//Update updates the user with `id` with values in `updates`
func (ms *MySQLStore) Update(id int64, updates *Updates) (*User, error) {

	// updating both member status and member type
	if len(updates.Type) > 0 && len(updates.Status) > 0 {
		results, err := ms.db.Exec(sqlUpdate, updates.Type, updates.Status, id)
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
	} else if len(updates.Type) > 0 { //updating only member type
		results, err := ms.db.Exec(sqlUpdateType, updates.Type, id)
		if err != nil {
			return nil, fmt.Errorf("updating: %v", err)
		}

		affected, err := results.RowsAffected()
		if err != nil {
			return nil, fmt.Errorf("getting rows affected: %v", err)
		}

		if affected == 0 {
			return nil, ErrUserNotFound
		}

	} else if len(updates.Status) > 0 { //update on member status
		results, err := ms.db.Exec(sqlUpdateStatus, updates.Status, id)
		if err != nil {
			return nil, fmt.Errorf("updating: %v", err)
		}

		affected, err := results.RowsAffected()
		if err != nil {
			return nil, fmt.Errorf("getting rows affected: %v", err)
		}

		if affected == 0 {
			return nil, ErrUserNotFound
		}
	}

	return ms.GetByID(id)
}

//GetByID gets the user details with the specified `id`
func (ms *MySQLStore) GetByID(id int64) (*User, error) {
	row := ms.db.QueryRow(sqlSelectByID, id)
	user := &User{}

	if err := row.Scan(&user.ID, &user.PassHash, &user.UserName); err != nil {
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

	if err := row.Scan(&user.ID, &user.PassHash, &user.UserName); err != nil {
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
func (ms *MySQLStore) GetAll() ([]*User, error) {
	rows, err := ms.db.Query(sqlSelectAll)

	users := []*User{}

	if err != nil {
		return nil, err
	}

	for rows.Next() {
		user := &User{}
		if err := rows.Scan(&user.ID, &user.PassHash, &user.UserName); err != nil {
			if err == sql.ErrNoRows {
				return nil, ErrUserNotFound
			}
			return nil, fmt.Errorf("scanning: %v", err)
		}

		users = append(users, user)
	}
	return users, nil
}

const sqlSelectUserType = "select * from users where userType=?"

//find users of a specific type
func (ms *MySQLStore) GetByUsertype(usertype string) (string, error) {
	row := ms.db.QueryRow(sqlSelectUserType, usertype)
	user := &User{}

	if err := row.Scan(&user.ID, &user.PassHash, &user.UserName, &user.Type, &user.Status); err != nil {
		if err == sql.ErrNoRows {
			return "", ErrUserNotFound
		}
		return "", fmt.Errorf("scanning: %v", err)
	}
	return user.Type, nil
}

//find users of a specific status
func (ms *MySQLStore) GetByUserstatus(userstatus string) (string, error) {
	row := ms.db.QueryRow(sqlSelectUserType, userstatus)
	user := &User{}

	if err := row.Scan(&user.ID, &user.PassHash, &user.UserName, &user.Type, &user.Status); err != nil {
		if err == sql.ErrNoRows {
			return "", ErrUserNotFound
		}
		return "", fmt.Errorf("scanning: %v", err)
	}
	return user.Type, nil
}
