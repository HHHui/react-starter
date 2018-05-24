# 增加Redux-Saga
1. sagas.js导出mySaga是一个generator，generator和普通function的区别。
2. 为什么要搞一个takeLasted, takeLast等等。
3. dva的subscribe怎么实现的? 这样我就不用在componentDidMount中发请求的action了。
4. dva简化了saga的哪些步骤？
5. dva里不定义ACTION TYPE，如何防止typo错误，有warning提醒吗？
6. 终极难题： 看懂redux-saga文档中的Background on the Saga concept

7. 为什么redux-saga里要分watcher function和woker function? 直接woker function不就好了吗?
答: watcher监听action,发起woker，比如takeEvery，takeLasted不同的pattern，不负责具体的biz。
woker负责具体的biz，而不用考虑pattern，监听action等逻辑。
两者分离逻辑比较清晰，其实写在一坨应该是可以的。
参考: [helper](https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html)

8. saga里面比如put什么的一定要加yield吗？感觉这种同步的不用yield啊
不yield，sagaMiddleware怎么拿到值？
可以把yield看成一个小型return，yield返回一个值，可以在外部通过iterator拿到，然后iterator.next(value)还能让function继续下去。

9. saga里为什么每一次都要fork

10. saga怎么实现cancel的?

11. takeEvery为什么可以多个同时用? 如下为什么不会阻塞.

12. `cps` stands for Continuation Passing Style.什么是`cps`,如何做到转换的?
[cps](https://redux-saga.js.org/docs/basics/DeclarativeEffects.html)
```javascript
export default function* rootSaga() {
  yield takeEvery('FETCH_USERS', fetchUsers)
  yield takeEvery('CREATE_USER', createUser)
}
```
13. javascript thorw new Error('fuck'), throw 'fuck'区别;
Error对象会带有stack,message = 'fuck',name(不知)信息.
而throw 'fuck'就只会显示fuck,没有stack信息.

14. 如何Custome Error?

## redux-saga相关文章
1. https://medium.com/@jeanpan/saga-pattern-redux-saga-e694a31576ab

# You Don't Know JS
1. 第一章介绍一些术语
2. 介绍callback为什么不好. 
callback执行的顺序(跳动)和大脑顺序思考不同.
ajax("..", function(){ ... }) 这其中的callback function不是由自己,而常常是第三方库来调用的,这其中有IOC.

## antd Table
1. what's the use of column 