import redis, { createClient } from "redis";

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});
//event listener

client.on("error", (error) =>
  console.log("Redis client error occured!", error)
);

async function testRedisConnection() {
  try {
    await client.connect();
    console.log("Connected to redis");
    await client.set("key", "Rahul Kumar");
    const extractvalue = await client.get("key");
    console.log(extractvalue);
    //Delete
    const deleteCount = await client.del("key");
    console.log(deleteCount);

    // Update
    const extractUpdateValue = await client.get("key");
    console.log(extractUpdateValue);

    //increment

    await client.set("value", 100);
    const incremet = await client.incr("value");
    console.log(incremet);
  } catch (error) {
    console.error(error);
  } finally {
    await client.quit();
  }
}
testRedisConnection();
