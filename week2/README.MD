# 2차 과제

# SOPT 서버파트 세미나 조 관리하기

세미나에서 앉게 되는 조를 등록/조회/변경할 수 있는 서버를 만드는 것이 과제입니다.
난이도별로 도전 과제가 주어집니다. Level 1까지만 구현해도 과제로 인정됩니다!

## Level 1
- member.csv파일에 사용자 정보(이름, 그룹 번호)가 저장 되어있다.
- [/api/group]: 전체 그룹 구성을 조회한다.
- [/api/group/:groupIdx]: 그룹 구성원을 조회한다.

※ [Path Variable 방식](https://ryan-han.com/post/translated/pathvariable_queryparam/)
localhost:3000/api/group/:groupIdx 으로 라우팅을 설정하고

localhost:3000/api/group/4이 호출된다면 <br/>
req.params.groupId에 4라는 값이 들어오게 됩니다!

> [Path Variable과 Query Parameter는 언제 사용해야 할까?](https://ryan-han.com/post/translated/pathvariable_queryparam/)

## Level 2
- Group.csv에 Group 정보(그룹 번호, 그룹 이름)가 저장 되어있다.
- 조회할 때 groupIdx대신에 그룹 이름으로 보여준다.

## Level 3
- 구성원들의 조원을 섞어주는 모듈(groupMixer)을 만든다.[방식 자유]