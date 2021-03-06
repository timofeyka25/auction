package repo

import (
	auction "auction-api"
	"fmt"
	"github.com/jmoiron/sqlx"
)

type AuthMysql struct {
	db *sqlx.DB
}

func NewAuthMysql(db *sqlx.DB) *AuthMysql {
	return &AuthMysql{db: db}
}

func (a *AuthMysql) CreateUser(user auction.User) (int, error) {
	var id int64
	query := fmt.Sprintf("insert into %s (first_name, last_name, username, password_hash, role_id) values (?,?,?,?,?)", userTable)
	result, err := a.db.Exec(query, user.FirstName, user.LastName, user.Username, user.Password, user.RoleId)
	if err != nil {
		return 0, err
	}
	id, err = result.LastInsertId()
	if err != nil {
		return 0, err
	}
	return int(id), nil
}

func (a *AuthMysql) GetUser(username, password string) (auction.User, error) {
	var user auction.User
	query := fmt.Sprintf("select * from %s where username = ? and password_hash = ?", userTable)
	err := a.db.Get(&user, query, username, password)

	return user, err
}

func (a *AuthMysql) GetUserInfo(id int) (auction.UserInfo, error) {
	var user auction.UserInfo
	query := fmt.Sprintf("select id, first_name, last_name, username, role_id, is_active"+
		" from %s where id = ?", userTable)
	err := a.db.Get(&user, query, id)

	return user, err
}

func (a *AuthMysql) ChangePassword(username, password, newPassword string) error {
	query := fmt.Sprintf("update %s set password_hash = ? where username = ? and password_hash = ?", userTable)
	_, err := a.db.Exec(query, newPassword, username, password)

	return err
}
