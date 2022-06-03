package repo

import (
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
