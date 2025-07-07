import redis from "redis";

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});
//event listner

client.on("error", (error) => {
  console.log("Redis client error occured!", error);
});

async function redisDataStructures() {
  try {
    await client.connect();

    await client.set("user:name", "Rahul Kumar");
    const name = await client.get("user:name");
    console.log(name);
    await client.mSet({
      "user:email": "rahulkr@gmail.com",
      "user:age": "60",
      "user:country": "India",
    });
    const [email, age, country] = await client.mGet([
      "user:email",
      "user:age",
      "user:country",
    ]);
    // console.log(email, age, country);

    // lists->LPUSH,RPUSH,LRANGE,LPOP,RPOP
    await client.LPUSH("notes", ["note 1", "note 2", "note 3"]);
    const extractAllNotes = await client.lRange("notes", 0, -1);
    // console.log(extractAllNotes);

    //sets
    await client.sAdd("user:nickName", ["john", "varun", "xyz"]);
    const extractUserNicknames = await client.sMembers("user:nickName");
    console.log(extractUserNicknames);

    const isVarunIsOneOfUserNickName = await client.sIsMember(
      "user:nickName",
      "varun"
    );
    console.log(isVarunIsOneOfUserNickName);

    await client.sRem("user:nickName", "xyz");
    const getUpdateUserNicknames = await client.sMembers("user:nickName");
    console.log(getUpdateUserNicknames);

    await client.zAdd("cart", [
      {
        score: 100,
        value: "cart1",
      },
      {
        score: 150,
        value: "cart2",
      },
      {
        score: 10,
        value: "cart3",
      },
    ]);
    const getcartItems = await client.zRange("cart", 0, -1);

    console.log(getcartItems);
    const extractAllCartItemsWithScore = await client.zRangeWithScores(
      "cart",
      0,
      -1
    );
    console.log(extractAllCartItemsWithScore);

    const cartTwoRank = await client.zRank("cart", "cart2");
    console.log(cartTwoRank);
  } catch (error) {
    console.log(error);
  } finally {
    client.quit();
  }
}
redisDataStructures();
