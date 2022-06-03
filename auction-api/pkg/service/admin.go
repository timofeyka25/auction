package service

import (
	auction "auction-api"
	"auction-api/pkg/repo"
)

type AdminService struct {
	repo repo.Admin
}

func NewAdminService(repo repo.Admin) *AdminService {
	return &AdminService{repo: repo}
}

func (a *AdminService) NewAdmin(userId int) error {
	return a.repo.UpdateRole(userId, int(auction.Admin))
}

func (a *AdminService) NewStaff(userId int) error {
	return a.repo.UpdateRole(userId, int(auction.Staff))
}

func (a *AdminService) NewClient(userId int) error {
	return a.repo.UpdateRole(userId, int(auction.Client))
}

func (a *AdminService) DeactivateUser(userId int) error {
	return a.repo.UpdateIsActive(userId, false)
}

func (a *AdminService) ActivateUser(userId int) error {
	return a.repo.UpdateIsActive(userId, true)
}

func (a *AdminService) GetClients() ([]auction.UserInfo, error) {
	return a.repo.GetUsers(int(auction.Client))
}

func (a *AdminService) GetStaff() ([]auction.UserInfo, error) {
	return a.repo.GetUsers(int(auction.Staff))
}

func (a *AdminService) GetAdmins() ([]auction.UserInfo, error) {
	return a.repo.GetUsers(int(auction.Admin))
}
