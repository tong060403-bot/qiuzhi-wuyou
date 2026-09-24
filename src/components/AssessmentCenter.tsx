import { useMemo, useState } from 'react'
import { SEED_ASSESSMENTS } from '../data/assessments'
import type { Assessment } from '../types'
import { useStore, daysBetween, today } from '../store'

/**
 * 邮箱同步 API 占位：接入后端后替换为真实实现
 * 后端方案：Gmail API (OAuth) + QQ邮箱 IMAP 授权码，定时解析「测评/笔试/AI面」邀请邮件
 */
async function apiSyncAssessments(): Promise<Assessment[]> {
  // return fetch('/api/assessments/sync').then(r => r.json())
  await new Promise((r) => setTimeout(r, 1000))
  return SEED_ASSESSMENTS
}

export default function AssessmentCenter() {
  const [remote, setRemote] = useState<Assessment[]>(SEED_ASSESSMENTS)
  const [doneIds, setDoneIds] = useStore<string[]>('asDone', [])
  const [ignoredIds, setIgnoredIds] = useStore<string[]>('asIgnored', [])
  const [syncing, setSyncing] = useState(false)
  const [lastSync, setLastSync] = useStore<string>('asLastSync', '')

  const list = useMemo(
    () =>
      remote
        .filter((a) => !doneIds.includes(a.id) && !ignoredIds.includes(a.id))
        .sort((a, b) => a.deadline.localeCompare(b.deadline)),
    [remote, doneIds, ignoredIds],
  )

  const sync = async () => {
    setSyncing(true)
    const fresh = await apiSyncAssessments()
    // 合并：远端新数据 + 本地保留的旧数据
    setRemote((prev) => {
      const ids = new Set(prev.map((x) => x.id))
      return [...fresh.filter((x) => !ids.has(x.id)), ...prev]
    })
    setLastSync(new Date().toLocaleString('zh-CN'))
    setSyncing(false)
  }

  const t = today()
  const urgent = list.filter((a) => daysBetween(t, a.deadline) <= 0).length

  return (
    <div className="card mb-4">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="font-semibold text-sm">📬 测评中心{urgent > 0 && <span className="tag bg-red-100 text-red-600 ml-2">{urgent} 项今天截止</span>}</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            邮箱同步的测评/笔试/AI面邀请{lastSync ? ` · 上次同步 ${lastSync}` : ' · 种子数据 2026-09-24'}
          </p>
        </div>
        <button onClick={sync} disabled={syncing} className="btn-ghost !py-1 text-xs shrink-0">
          {syncing ? '同步中…' : '同步邮箱'}
        </button>
      </div>

      <div className="space-y-2">
        {list.map((a) => {
          const d = daysBetween(t, a.deadline)
          const color = d < 0 ? 'text-gray-400' : d === 0 ? 'text-red-600 font-bold' : d <= 2 ? 'text-orange-500 font-medium' : 'text-blue-600'
          const bg = d === 0 ? 'border-red-300 bg-red-50' : d < 0 ? 'border-gray-200 bg-gray-50 opacity-60' : 'border-gray-100 bg-white'
          return (
            <div key={a.id} className={`rounded-lg border p-3 ${bg}`}>
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{a.company} · {a.title}</div>
                  <div className="text-xs mt-0.5">
                    <span className="tag bg-purple-50 text-purple-600">{a.type}</span>
                    <span className={`ml-2 ${color}`}>
                      {d < 0 ? '已过期' : d === 0 ? `今天 ${a.deadlineTime || ''} 截止！` : `${a.deadline} 截止（${d}天）`}
                    </span>
                    <span className="text-gray-400 ml-2">{a.source}</span>
                  </div>
                  {a.note && <p className="text-xs text-gray-500 mt-1 leading-4">{a.note}</p>}
                </div>
                <div className="flex flex-col gap-1 shrink-0">
                  {a.link && <a href={a.link} target="_blank" rel="noreferrer" className="btn-primary !py-1 text-xs">去做</a>}
                  <button onClick={() => setDoneIds([...doneIds, a.id])} className="btn-ghost !py-1 text-xs">完成</button>
                  <button onClick={() => setIgnoredIds([...ignoredIds, a.id])} className="btn-ghost !py-1 text-xs !text-gray-400">忽略</button>
                </div>
              </div>
            </div>
          )
        })}
        {!list.length && <div className="text-xs text-gray-400 py-3 text-center">没有待完成的测评，点「同步邮箱」检查新邀请</div>}
      </div>
      <p className="text-xs text-gray-400 mt-2 leading-4">
        提示：当前为手动同步。实时自动抓取需接入后端（Gmail API + QQ邮箱 IMAP），已在代码中预留接口。
      </p>
    </div>
  )
}
