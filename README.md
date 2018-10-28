Reverse hashing method
======================
Project generated with NestJs, using TypeOrm & PostgreSql aiming at reversing a hashing method based on some provided resulting hash.
Method to do so is kinda funny right now and can be much improved :+1: That's for sure :)


### How to run the server:

- ```npm install```
- ```npm run start```

### Use of the server:
- Call ```GET http:localhost:3000/resolve?hash=<your-hash>``` with your preferred REST client (Postman, Insomnia....)<br>
This endpoint will try to brute force the hashing method to return you the string that initiated this hash.
- If you want to try a string and see what's the resulting hash, you can try to hit this endpoint:
```GET http:localhost:3000/hash?string=<your-string>```

### Problem
Atm, the way to improve the reverse hashing method is to check the postgre DB to find entries that
are close to the targeted (or provided) hash, and look at the pattern of the corresponding string that issued the hash.
This way you can help the algorithm narrow the possibilities to compute by manually setting the `initialString` in the `app.service.ts`'s `generateString()` function.

### Improvements:
- Programmatically narrow the possibilities based on the results of the reverse hashing function, instead of visually and manually doing so.
- Improve code quality and readability ?


Have fun, and if you want to improve, don't hesitate to issue a PR :taco: :tada:
