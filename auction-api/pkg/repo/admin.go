package repo

import (
	auction "auction-api"
	"fmt"
	"github.com/jmoiron/sqlx"
)

type AdminMysql struct {
	db *sqlx.DB
}

func NewAdminMysql(db *sqlx.DB) *AdminMysql {
	return &AdminMysql{db: db}
}

func (a *AdminMysql) UpdateRole(userId, roleId int) error {
	query := fmt.Sprintf("update %s set role_id = ? where id = ?", userTable)
	_, err := a.db.Exec(query, roleId, userId)

	return err
}

func (a *AdminMysql) UpdateIsActive(userId int, isActive bool) error {
	query := fmt.Sprintf("update %s set is_active = ? where id = ?", userTable)
	_, err := a.db.Exec(query, isActive, userId)

	return err
}

func (a *AdminMysql) GetUsers(roleId int) ([]auction.UserInfo, error) {
	var users []auction.UserInfo
	query := fmt.Sprintf("select id, first_name, last_name, username, role_id, is_active from %s where role_id = ?", userTable)
	err := a.db.Select(&users, query, roleId)

	return users, err
}
