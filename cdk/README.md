# Cart



### Write patterns

| Pattern | Query Conditions |
| --- | --- |
| Create Cart | PK = "COOKIE#${cookieId}" SK = "CART" |
| Create Cart Event | PK = "COOKIE#${cookieId}" SK = "CARTEVENT#${eventId}" |


### Read Patterns

| Pattern | Query Conditions | 
| --- | --- |
| Get Cart with Cart Events | PK = "COOKIE#${cookieId}" SK >= "CART" |
