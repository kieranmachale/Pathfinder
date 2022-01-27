# Pathfinder

<h2>Instructions for use</h2>
    <ol>
        <li>Navigate to the root directory</li>
        <li>Run 'npm i'</li>
        <li>Run 'npm start' or 'npm run dev'</li>
    </ol>

<br>
<table style="caption-side: top">
<caption>Operations on the auth resources </caption>
<tr>
    <th>URI</th>
    <th>Method</th>
    <th>Auths?</th>
    <th>Operation</th>
</tr>


<tr>
    <td>auth/login</td>
    <td>POST</td>
    <td>No</td>
    <td>
    Verify if the credentials of a user  and return the User and a JWT token if he's ok
    </td>
</tr>
<tr>
    <td>auth/register</td>
    <td>POST</td>
    <td>No</td>
    <td>
    create an user create a JWT token for him and return the User and a JWT token
    </td>
</tr>
<tr>
    <td>auth/logout</td>
    <td>GET</td>
    <td>Yes</td>
    <td>
        Logout the user return status code.
    </td>
</tr>
</table>

<table style="caption-side: top">
<caption>Operations on the user resources </caption>
<tr>
    <th>URI</th>
    <th>Method</th>
    <th>Auths?</th>
    <th>Operation</th>
</tr>
<tr>
    <td>user/</td>
    <td>GET</td>
    <td>Yes</td>
    <td>
        Returning all the users.
    </td>
</tr>
<tr>
    <td>user/{id}</td>
    <td>GET</td>
    <td>Yes</td>
    <td>
        Returning a single user.
    </td>
</tr>
<tr>
    <td>user/id</td>
    <td>DELETE</td>
    <td>Yes</td>
    <td>
        Remove a single user.
    </td>
</tr>
</table>

<table style="caption-side: top">
<caption>Operations on project resources</caption>
<tr>
    <th>URI</th>
    <th>Method</th>
    <th>Auths?</th>
    <th>Operation</th>
</tr>
<tr>
  <td>project/{userId}</td>
  <td>GET</td>
  <td>YES</td>
  <td>
      Return all the projects for a single user
  </td>
</tr>
<tr>
  <td>project/{userId}/{projectId}</td>
  <td>GET</td>
  <td>YES</td>
  <td>
      Return a single reminder created by a user
  </td>
</tr>
<tr>
  <td>project/</td>
  <td>GET</td>
  <td>NO</td>
  <td>
      Return all public projects
  </td>
</tr>
<tr>
  <td>newProject/</td>
  <td>POST</td>
  <td>YES</td>
  <td>
      Create a project for a single user
  </td>
</tr>
<tr>
  <td>project/{projectId}</td>
  <td>PATCH</td>
  <td>YES</td>
  <td>
      Update a project's specifications
  </td>
</tr>
<tr>
  <td>project/{projectId}</td>
  <td>DELETE</td>
  <td>YES</td>
  <td>
      Remove a project created by the user
  </td>
</tr>
</table>
