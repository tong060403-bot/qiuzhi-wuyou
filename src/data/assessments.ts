import type { Assessment } from '../types'

// 种子数据：2026-09-24 从用户 Gmail 抓取的测评/笔试/视频面试邀请
// 接入后端后由 apiSyncAssessments() 增量更新
export const SEED_ASSESSMENTS: Assessment[] = [
  {
    id: 'as1', company: '同花顺', title: 'AI产品经理（AIGC）在线笔试', type: '笔试',
    deadline: '2026-09-24', deadlineTime: '21:00', source: 'Gmail',
    link: 'http://m.hexin.cn/_i0bpuu',
    note: '进入后 24 小时内完成作答，中途退出倒计时不停',
  },
  {
    id: 'as2', company: '中兴通讯', title: '校园招聘在线测评', type: '测评',
    deadline: '2026-09-25', source: 'Gmail',
    link: 'https://app.mokahr.com/su/spjvnt',
    note: '链接 72 小时有效，仅一次机会，中途勿退出',
  },
  {
    id: 'as3', company: '美的集团', title: '2027届校招 AI 面试', type: 'AI面',
    deadline: '2026-09-26', deadlineTime: '23:59', source: 'Gmail',
    note: '提前测试摄像头/麦克风/网速，任意时间完成',
  },
  {
    id: 'as4', company: '海尔集团', title: '2027校招在线测评（基础+多维）', type: '测评',
    deadline: '2026-09-26', source: 'Gmail',
    link: 'https://haier.ceping.com/Login/Elink?elink=C3tg9B/',
    note: '收到 3 天内完成，否则视为放弃，需完成全部维度',
  },
  {
    id: 'as5', company: 'TCL', title: '校招人才测评', type: '测评',
    deadline: '2026-09-26', source: 'Gmail',
    note: '3 天内完成；投递多职位不需重复作答，但各链接都要点一下',
  },
  {
    id: 'as6', company: '海康威视', title: '校招在线测评', type: '测评',
    deadline: '2026-09-27', source: 'Gmail',
    link: 'https://bsurl.cn/v2/CtaIpShL',
    note: '专属链接勿转发；打不开用备用地址 hikvision.ceping.com',
  },
  {
    id: 'as7', company: '传音控股', title: '在线测评', type: '测评',
    deadline: '2026-09-28', deadlineTime: '09:25', source: 'Gmail',
    link: 'https://bsurl.cn/v2/HXSF4ZR6',
    note: '9/21 生效，9/28 失效，抓紧完成',
  },
  {
    id: 'as8', company: '牛客网', title: 'AI Agent 产品评测实习生 AI 面试', type: 'AI面',
    deadline: '2026-09-23', deadlineTime: '21:56', source: 'Gmail',
    note: '已过期，微信小程序作答，未完成视为放弃',
  },
]
