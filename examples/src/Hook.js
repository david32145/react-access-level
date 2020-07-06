import React from "react"
import { useLogged, useRules } from "react-access-level"

export default function Hook() {
  const logged = useLogged()
  const rules = useRules()

  return (
    <>
      <h1>{logged ? "you are logged!!!" : "you are not logged!!!"}</h1>
      <ul>
        {rules.map(rule => <li key={rule}>{rule}</li>)}
      </ul>
    </>
  )
}