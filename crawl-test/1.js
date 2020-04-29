/** 
 * 如果说这个网站提供了API接口，那么就可以直接读取接口内容得到数据
 */

let axios = require('axios');
let url = 'https://lccro-api-ms.juejin.im/v1/get_multi_user?uid=&device_id=&token=&src=web&ids=5b7ac46ff265da43445f5bcb&cols=viewedEntriesCount%7Crole%7CtotalCollectionsCount%7CallowNotification%7CsubscribedTagsCount%7CappliedEditorAt%7Cemail%7CfollowersCount%7CpostedEntriesCount%7ClatestCollectionUserNotification%7CcommentedEntriesCount%7CweeklyEmail%7CcollectedEntriesCount%7CpostedPostsCount%7Cusername%7ClatestLoginedInAt%7CtotalHotIndex%7CblogAddress%7CselfDescription%7ClatestCheckedNotificationAt%7CemailVerified%7CtotalCommentsCount%7Cinstallation%7Cblacklist%7CweiboId%7CmobilePhoneNumber%7Capply%7CfolloweesCount%7CdeviceType%7CeditorType%7CjobTitle%7Ccompany%7ClatestVoteLikeUserNotification%7CauthData%7CavatarLarge%7CmobilePhoneVerified%7CobjectId%7CcreatedAt%7CupdatedAt';

(async function() {
    let result = await axios.get(url);
    console.log(result.data);
})()