import PocketBase from 'pocketbase';

const url = 'https://main-reach.pockethost.io/'
const superuserClient = new PocketBase(url)

const authData = await superuserClient.collection('_superusers').authWithPassword('tyler.law@gmail.com', '0rp!Pockethost')

const records = await superuserClient.collection('posts').getFullList({
    sort: '-created',
});

console.log(records)