# Pathfinder

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
<tr>
  <td>createProject/</td>
  <td>POST</td>
  <td>YES</td>
  <td>
      Create a project for a single user
  </td>
</tr>
<tr>
  <td>startScan/</td>
  <td>POST</td>
  <td>YES</td>
  <td>
      Launch the Arduino program and collect sensor data
  </td>
</tr>
