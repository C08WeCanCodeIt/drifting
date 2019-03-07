package handlers

import (
	"github.com/drifting/servers/gateway/models/users"
	"github.com/drifting/servers/gateway/sessions"
)

//HandlerContext contains information about the key used to sign and validate sessionIDs, session store and user store
type HandlerContext struct {
	Key          string
	UserStore    users.Store
	SessionStore sessions.Store
	Notifier     *Notifier
}
