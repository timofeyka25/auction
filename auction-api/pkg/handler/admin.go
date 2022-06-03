package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type userUpdateInput struct {
	UserId int `json:"user_id" binding:"required"`
}

func (h *Handler) newAdmin(c *gin.Context) {
	var input userUpdateInput

	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	if err := h.services.Admin.NewAdmin(input.UserId); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	c.JSON(http.StatusOK, statusResponse{"ok"})
}

func (h *Handler) newStaff(c *gin.Context) {
	var input userUpdateInput

	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	if err := h.services.Admin.NewStaff(input.UserId); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	c.JSON(http.StatusOK, statusResponse{"ok"})
}

func (h *Handler) newClient(c *gin.Context) {
	var input userUpdateInput

	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	if err := h.services.Admin.NewClient(input.UserId); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	c.JSON(http.StatusOK, statusResponse{"ok"})
}

func (h *Handler) deactivateUser(c *gin.Context) {
	var input userUpdateInput

	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	if err := h.services.Admin.DeactivateUser(input.UserId); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	c.JSON(http.StatusOK, statusResponse{"ok"})
}

func (h *Handler) activateUser(c *gin.Context) {
	var input userUpdateInput

	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	if err := h.services.Admin.ActivateUser(input.UserId); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	c.JSON(http.StatusOK, statusResponse{"ok"})
}
