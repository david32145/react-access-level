# React ACL

## Features

- Show component if has an role;
- Edit style of component if has or not an role;
- Show an custom component if is unauthorized;
- Enable if else components for show or not components based in authorities;
- Provide one way for set inital roles;
- The roles can be edited dynamically;

### How it be

Base Structure.
```ts
interface ReactACLProps {
  extractInitialRole: () => Role[];
  deafaultUnauthorizedComponent: React.FC;
}

interface Role {
  resource: string;
  authority: string;
}
```

Role component
```tsx
<HasRole resource="user" authority="logged">
  <p>You are logged</p>
</HasRole>
```

```tsx
<HasRole resource="user" authority="logged">
  {role => 
    role 
    ? (<p>You are logged</p>) 
    : (<p>Unauthorized</p>)
  }
</HasRole>
```

```tsx
<HasRole resource="user" authority="logged,create">
  {role => 
    role 
    ? (<p>You are logged</p>) 
    : (<p>Unauthorized</p>)
  }
</HasRole>
```

```tsx
<HasRole resource="user" authority={or("logged", "create")}>
  <p>You are logged</p>
</HasRole>
```

```tsx
<HasRole resource="user" authority={or("logged", "create", and("edit", "delete"))}>
  <p>You are logged</p>
</HasRole>
```

```tsx
<HasRole resource="user" authority="logged" showsUnauthorizedComponent>
  <p>You are logged</p>
</HasRole>
```