package service

import (
	auction "auction-api"
	"auction-api/pkg/repo"
	"crypto/sha1"
	"errors"
	"fmt"
	"github.com/golang-jwt/jwt"
	"time"
)

const (
	salt       = "goau78wgae087g0awgf7gwa"
	signingKey = "euyaofuygeygfoauygeo"
)

type tokenClaims struct {
	jwt.StandardClaims
	UserId int `json:"user_id"`
	RoleId int `json:"role"`
}

type AuthService struct {
	repo repo.Authorization
}

func NewAuthService(repo repo.Authorization) *AuthService {
	return &AuthService{repo: repo}
}

func (s *AuthService) CreateUser(user auction.User) (int, error) {
	user.RoleId = int(auction.Client)
	user.Password = generatePasswordHash(user.Username + user.Password)
	return s.repo.CreateUser(user)
}

func (s *AuthService) GenerateToken(username, password string) (string, error) {
	user, err := s.repo.GetUser(username, generatePasswordHash(username+password))
	if err != nil {
		return "", err
	}

	if user.IsActive == false {
		return "", errors.New("this account is no longer active")
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &tokenClaims{
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(12 * time.Hour).Unix(),
			IssuedAt:  time.Now().Unix()},
		user.ID, user.RoleId,
	})

	return token.SignedString([]byte(signingKey))
}

func (s *AuthService) GetUserRole(username, password string) (int, error) {
	user, err := s.repo.GetUser(username, generatePasswordHash(username+password))
	if err != nil {
		return 0, err
	}
	return user.RoleId, nil
}

func (s *AuthService) GetUserInfo(id int) (auction.UserInfo, error) {
	return s.repo.GetUserInfo(id)
}

func (s *AuthService) ParseToken(accessToken string) (int, int, error) {
	token, err := jwt.ParseWithClaims(accessToken, &tokenClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("invalid signing method")
		}

		return []byte(signingKey), nil
	})

	if err != nil {
		return 0, 0, err
	}

	claims, ok := token.Claims.(*tokenClaims)
	if !ok {
		return 0, 0, errors.New("token claims are not of type ")
	}
	return claims.UserId, claims.RoleId, nil
}

func (s *AuthService) ChangePassword(username, password, newPassword string) error {
	return s.repo.ChangePassword(username, generatePasswordHash(username+password),
		generatePasswordHash(username+newPassword))
}

func generatePasswordHash(password string) string {
	hash := sha1.New()
	hash.Write([]byte(password))

	return fmt.Sprintf("%x", hash.Sum([]byte(salt)))
}
