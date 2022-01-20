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
