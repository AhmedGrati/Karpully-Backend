## Important Notes:

1. Look up for the file .env.example to get an idea about environment variables.
2. The phone Number of the user should have the following format: "+216
   xxxxxxxx" where the 8 x's represent the phone number of the user.
3. Each user should have a unique username and email in the database to avoid
   spam and fake accounts.
4. The rate of the user should be between 0 and 5.
5. The age of the user should be between 5 and 100.

## Explanation of auth process:

1. The user will sign up.
2. An email will be sent to the user.
3. The user must confirm his registration after a maximum of two days.

## Managing applciation:
1. Make sure you have docker installed on your host.
2. Make the file run-stop.sh executable.
3. To run the up on a specific mode run the following command<br>
```linux
./run-stop.sh --type=start --mode=$MODE<br>
```
where $MODE is in (test | prod | dev).
4. To stop or restart the application you should just change the "--type=start", and fit it to your needs.
#### *It should be noted that test implementation is not ready.*

## License

The source code for the site is licensed under the MIT license, which you can
find in the LICENSE.txt file.
