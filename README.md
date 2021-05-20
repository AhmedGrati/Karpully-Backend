## Important Notes:

1. Look up for the file .env.example to get an idea about environment variables.
2. The phone Number of the user should have the following format: "+216
   xxxxxxxx" where the 8 x's represent the phone number of the user.
3. Each user should have a unique username and email in the database to avoid
   spam and fake accounts.
4. The rate of the user should be between 0 and 5.
5. The age of the user should be between 5 and 100.

## Explanation Of Authentification Process:

1. The user will sign up.
2. An email will be sent to the user.
3. The user must confirm his registration after a maximum of two days.

## Authorization Policies

### For Carpools:

<ul>
<li> All Users could see all carpools and/or specific carpool.</li>
<li> Only The owner of the carpool could update or remove it.</li>
</ul>

### For Cities And Govs:

<ul>
<li> Only the admin could access and manage those resources.</li>
</ul>

### For User And Emails:

<ul>
<li>The admin could access all informations.</li>
<li>The user could manage only its own informations.</li>
</ul>

## Pagination:

The pagination feature is now implemented simply for carpools. Simple Example
Query:

```gql
query {
  paginatedCarpool(
    where: {hasSmokePermission: true}
    paginationInput: {page: 1, limit: 20}
  ) {
    meta {
      itemCount
      currentPage
    }
    items {
      hasSmokePermission
      description
      owner {
        username
      }
      departureDate
    }
  }
}
```

## Submissions Management:

1. Only the owner of the carpool could accept or reject a submission.
2. The user cannot make a submission to its own carpool.
3. The owner of a carpool cannot accept(/reject) an already accepted(/rejected)
   submission.
4. The owner of a carpool cannot accept submissions anymore when the available
   number of places of the carpool reaches 0.

## Application Management:

1. Make sure you have docker installed on your host.
2. Make the file run-stop.sh executable.
3. To run the up on a specific mode run the following command<br>

```linux
./run-stop.sh --type=start --mode=$MODE
```

where $MODE is in (test | prod | dev).<br> 4. To stop or restart the application
you should just change the "--type=start", and fit it to your needs.<br> 5. In
.env file, the HOST key should have 'postgres' as value. <br> 6. To run the
application in a kubernetes environment run

```linux
./k8s/run-stop.sh --type=start
```

#### _It should be noted that test implementation is not ready._

## License

The source code for the site is licensed under the MIT license, which you can
find in the LICENSE.txt file.
