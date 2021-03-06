import React from "react"
import {
  Logged,
  NotLogged,
  Can,
  and,
  or
} from "react-access-level"

export default function Home() {
  return (
    <div>
      <Logged>
        <p>user logged</p>
      </Logged>
      <NotLogged>
        <p>user not logged</p>
      </NotLogged>

      <Can>
        <p>no effect</p>
      </Can>
      <Can resource="user" authority="create">
        <button>Create user</button>
      </Can>

      <br />

      <Can resource="user" authority="destroy">
        {accept => <button disabled={!accept}>delete user</button>}
      </Can>

      <br />

      <Can match={and("user:create", or("user:delete", "user:update"))}>
        <p>it's ok!!</p>
      </Can>

      <Logged showAnauthorizedComponent>
        <p>user logged</p>
      </Logged>

      <Logged otherwiseComponent={<span>DENIED</span>}>
        <p>user logged</p>
      </Logged>

      <Can resource="user" authority="destroy" showAnauthorizedComponent>
        <button>delete user</button>
      </Can>

      <Can 
        resource="user"
        authority="destroy"
        otherwiseComponent={<b>CAN'T DELETE USER</b>}
      >
        <button>delete user</button>
      </Can>

    </div>
  )
}