/* ============================================
   精娃 vs 憨娃（朴娃）— 核心逻辑
   基于「青稞体系 · 不厌学指南」框架
   核心区分维度：对环境敏感程度与适应速度
   ============================================ */

// --- 行为特征数据 ---
// 7 个维度，每维度 3 精娃 + 3 憨娃 = 42 条
// type: 'jing' (高敏型/容易型) | 'han' (钝感型/启动缓慢型)
const dimensions = [
  {
    id: 'autonomy',
    name: '自主意识',
    icon: '🧭',
    traits: [
      { id: 'a1', type: 'jing', label: '你给孩子安排好了周末计划，TA 却拿出自己的一套方案，坚持按自己的来，很难被说服' },
      { id: 'a2', type: 'jing', label: '你给 TA 买衣服，TA 非要自己挑，搭配好了还要照镜子审视一番，对你选的统统不满意' },
      { id: 'a3', type: 'jing', label: '你让 TA 用某种方法收拾玩具，TA 偏要用自己发明的方法，还说你的方法"太慢了"' },
      { id: 'a4', type: 'han', label: '你问 TA 周末想做什么，回答永远是"随便""都行"，不太有自己的想法' },
      { id: 'a5', type: 'han', label: '你让 TA 选一个兴趣班，TA 纠结半天选不出来，最后说"妈妈你帮我选吧"' },
      { id: 'a6', type: 'han', label: '玩游戏时伙伴说玩什么就玩什么，从不主动提议，被安排了也不介意' },
    ]
  },
  {
    id: 'expression',
    name: '表达与意图',
    icon: '💬',
    traits: [
      { id: 'e1', type: 'jing', label: '想吃月饼不直说，先问你"妈妈，月亮为什么老跟着我？"绕了一大圈最后才暴露真实目的 🌙' },
      { id: 'e2', type: 'jing', label: '想让你多陪一会儿但不直说，而是拿着书凑过来"妈妈这个故事我看不懂你帮我看看"' },
      { id: 'e3', type: 'jing', label: '为了多看会儿动画片，会说"这集就剩三分钟了让我看完嘛"，其实还剩十五分钟' },
      { id: 'e4', type: 'han', label: '想要什么就直接说"我要那个！"从不绕弯子，你一眼就能看穿 TA 的小心思' },
      { id: 'e5', type: 'han', label: '开心就哈哈大笑，不高兴马上拉下脸，做错事一问你表情就出卖了自己，藏不住事' },
      { id: 'e6', type: 'han', label: '偷吃了零食后嘴角还挂着渣就来跟你说"我没吃"，撒谎水平约等于零' },
    ]
  },
  {
    id: 'adaptation',
    name: '环境适应',
    icon: '🌍',
    traits: [
      { id: 'ad1', type: 'jing', label: '第一次带去朋友家做客，TA 很快就自来熟，像在自己家一样到处探索' },
      { id: 'ad2', type: 'jing', label: '全家出去旅游住酒店，TA 比你还先适应，倒头就睡，不认床不认生' },
      { id: 'ad3', type: 'jing', label: '你带 TA 参加全是陌生大人的饭局，TA 能大方地跟不认识的叔叔阿姨聊天' },
      { id: 'ad4', type: 'han', label: '到一个陌生环境会紧紧跟在你身边，要过好一阵子才慢慢放开，比较慢热' },
      { id: 'ad5', type: 'han', label: '家里来了不太熟的亲戚，TA 会躲进自己房间不愿意出来打招呼' },
      { id: 'ad6', type: 'han', label: '转学或换班后前几周每天都闷闷不乐，要一两个月才能慢慢缓过来' },
    ]
  },
  {
    id: 'social',
    name: '社交能力',
    icon: '🤝',
    traits: [
      { id: 's1', type: 'jing', label: '不用你教，TA 自己就知道见了叔叔阿姨要热情打招呼，嘴巴还特别甜，很会哄人开心' },
      { id: 's2', type: 'jing', label: '在小区里见谁都能聊两句，保安叔叔、清洁阿姨、快递小哥全被 TA 混熟了' },
      { id: 's3', type: 'jing', label: '看到新来的小朋友没人一起玩，TA 会主动过去邀请，很有"外交"意识' },
      { id: 's4', type: 'han', label: '你从 TA 小时候就教"见人要打招呼"，教到七八岁才终于能主动做到，之前每次都要你提醒' },
      { id: 's5', type: 'han', label: '和小朋友相处时一是一二是二，不会特意讨好谁，有时显得又愣又轴' },
      { id: 's6', type: 'han', label: '在学校被排挤或欺负了，不知道怎么反击也不知道怎么求助，回家闷着不说' },
    ]
  },
  {
    id: 'thinking',
    name: '思维模式',
    icon: '🧠',
    traits: [
      { id: 't1', type: 'jing', label: '你换了微信头像，TA 第二天就发现了；邻居家门上新贴了对联，TA 比你先注意到' },
      { id: 't2', type: 'jing', label: '家里谁跟谁闹别扭了，TA 比你还先察觉，还会悄悄来提醒你"妈妈，爸爸好像不高兴了"' },
      { id: 't3', type: 'jing', label: '出门前 TA 会提醒你"妈妈你忘了带手机/钥匙"，观察力比你还强' },
      { id: 't4', type: 'han', label: '你换了新发型回到家，TA 过了半天才突然抬头说"诶妈妈你剪头发了？"' },
      { id: 't5', type: 'han', label: '你交代 TA 做三件事，TA 做第一件时太投入太开心，后面两件完全忘光了' },
      { id: 't6', type: 'han', label: 'TA 经常找不到自己的东西，袜子只剩一只、作业本不翼而飞、水壶又忘在学校了' },
    ]
  },
  {
    id: 'emotion',
    name: '情绪表现',
    icon: '🎭',
    traits: [
      { id: 'em1', type: 'jing', label: '你说话语气稍微重了一点点，TA 就觉得很委屈，甚至眼泪在眼眶里打转' },
      { id: 'em2', type: 'jing', label: '你夸了别的小朋友一句，TA 马上就不高兴了，有明显的"吃醋"反应' },
      { id: 'em3', type: 'jing', label: '感觉到你心情不好时，TA 会小心翼翼地过来哄你"妈妈你别生气了，我给你倒杯水"' },
      { id: 'em4', type: 'han', label: '在学校被老师狠狠批评了，回家跟没事人一样，过一会儿就笑嘻嘻地玩去了' },
      { id: 'em5', type: 'han', label: '被小伙伴捉弄了也不记仇，憨憨一笑就过去了，不会耿耿于怀，转头就忘了' },
      { id: 'em6', type: 'han', label: '你说"再这样妈妈不喜欢你了"，TA 说"哦那我找爸爸玩"，对负面评价有天然免疫力' },
    ]
  },
  {
    id: 'behavior',
    name: '行为倾向',
    icon: '🎯',
    traits: [
      { id: 'b1', type: 'jing', label: '为了买一个心仪已久的玩具，TA 能自己制定"攒星星计划"并且坚持执行好几周不动摇' },
      { id: 'b2', type: 'jing', label: '遇到限制和规则时（如不准吃零食），TA 总能找到各种"技术性漏洞"绕过去' },
      { id: 'b3', type: 'jing', label: '为了达到一个重要目的（如去游乐园），TA 会提前好几天就开始做铺垫工作、步步为营' },
      { id: 'b4', type: 'han', label: '玩乐高或做手工时全情投入，叫 TA 吃饭都听不见，完全沉浸在自己的世界里' },
      { id: 'b5', type: 'han', label: '做奥数题或拼图遇到难的地方，第一反应是"我不行"想要放弃，需要你推一把才愿意再试' },
      { id: 'b6', type: 'han', label: '本来说好要练琴，看到窗外小朋友在玩，立马跑出去加入了，完全忘了练琴这回事' },
    ]
  }
];

// --- 全局状态 ---
const checkedState = {};  // { traitId: true/false }

// --- 初始化 ---
document.addEventListener('DOMContentLoaded', () => {
  renderChecklist();
  bindEvents();

  // 检查是否有已保存的结果
  const savedResult = sessionStorage.getItem('jinghan_result');
  if (savedResult) {
    const data = JSON.parse(savedResult);
    data.checkedIds.forEach(id => { checkedState[id] = true; });
    updateAllCheckboxes();
    showResult();
    sessionStorage.removeItem('jinghan_result');
  }
});

// --- 渲染特征列表 ---
function renderChecklist() {
  const container = document.getElementById('checklist');
  container.innerHTML = '';

  dimensions.forEach(dim => {
    const card = document.createElement('div');
    card.className = 'dimension-card';

    const header = document.createElement('div');
    header.className = 'dimension-header';
    header.innerHTML = `
      <span class="dimension-icon">${dim.icon}</span>
      <span class="dimension-name">${dim.name}</span>
    `;
    card.appendChild(header);

    // 随机打乱维度内 trait 顺序，减少答题偏差
    const shuffled = [...dim.traits].sort(() => Math.random() - 0.5);

    shuffled.forEach(trait => {
      const item = document.createElement('div');
      item.className = 'trait-item';
      item.dataset.traitId = trait.id;
      item.dataset.type = trait.type;
      if (checkedState[trait.id]) item.classList.add('checked');

      item.innerHTML = `
        <span class="trait-checkbox"></span>
        <span class="trait-label">${trait.label}</span>
      `;

      item.addEventListener('click', () => toggleTrait(trait.id, item));
      card.appendChild(item);
    });

    container.appendChild(card);
  });
}

// --- 切换勾选状态 ---
function toggleTrait(traitId, element) {
  if (checkedState[traitId]) {
    delete checkedState[traitId];
    element.classList.remove('checked');
  } else {
    checkedState[traitId] = true;
    element.classList.add('checked');
    // 粒子迸发特效
    burstParticles(element.querySelector('.trait-checkbox'));
  }
  updateSubmitButton();
}

// --- 粒子迸发特效 ---
function burstParticles(origin) {
  const rect = origin.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const colors = ['#fbbf24', '#f59e0b', '#f97316', '#fef3c7', '#fde68a', '#fff'];
  const count = 10;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
    const distance = 18 + Math.random() * 22;
    const size = 3 + Math.random() * 5;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    particle.style.cssText = `
      left: ${cx}px;
      top: ${cy}px;
      width: ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      --dx: ${dx}px;
      --dy: ${dy}px;
    `;
    document.body.appendChild(particle);

    particle.addEventListener('animationend', () => particle.remove());
  }
}

// --- 更新所有勾选框的视觉状态 ---
function updateAllCheckboxes() {
  document.querySelectorAll('.trait-item').forEach(item => {
    const id = item.dataset.traitId;
    if (checkedState[id]) {
      item.classList.add('checked');
    } else {
      item.classList.remove('checked');
    }
  });
}

// --- 更新提交按钮状态 ---
// --- 获取未勾选的维度 ---
function getEmptyDimensions() {
  return dimensions.filter(dim =>
    !dim.traits.some(t => checkedState[t.id])
  ).map(d => d.name);
}

function updateSubmitButton() {
  const btn = document.getElementById('submit-btn');
  const count = Object.keys(checkedState).length;
  const empty = getEmptyDimensions();

  if (empty.length === 0) {
    btn.disabled = false;
    btn.textContent = `🔍 查看结果（已选 ${count} 项）`;
  } else if (empty.length === 7) {
    btn.disabled = true;
    btn.textContent = `🔍 查看结果（每个维度至少选 1 题）`;
  } else {
    btn.disabled = true;
    btn.textContent = `🔍 还需勾选：${empty.join('、')}`;
  }
  updateCounterHint();
}

// --- 计数器提示 ---
function updateCounterHint() {
  let hint = document.getElementById('counter-hint');
  if (!hint) {
    hint = document.createElement('div');
    hint.id = 'counter-hint';
    hint.className = 'counter-hint';
    const actionBar = document.querySelector('.action-bar');
    actionBar.insertBefore(hint, actionBar.firstChild);
  }
  const count = Object.keys(checkedState).length;
  const empty = getEmptyDimensions();
  hint.textContent = count === 0
    ? '👆 点击特征即可勾选，每个维度至少选 1 题'
    : empty.length > 0
      ? `已勾选 ${count} 项 · 待补：${empty.join('、')}`
      : `已勾选 ${count} 项 · ✅ 全部维度已覆盖`;
}

// --- 绑定事件 ---
function bindEvents() {
  document.getElementById('submit-btn').addEventListener('click', () => {
    const empty = getEmptyDimensions();
    if (empty.length > 0) {
      shakeElement(document.getElementById('submit-btn'));
      return;
    }
    showResult();
  });

  document.getElementById('reset-btn').addEventListener('click', resetAll);
}

// --- 计算分数 ---
function calculateScore() {
  let jingCount = 0;
  let hanCount = 0;
  const dimScores = {};

  dimensions.forEach(dim => { dimScores[dim.id] = { jing: 0, han: 0 }; });

  dimensions.forEach(dim => {
    dim.traits.forEach(trait => {
      if (checkedState[trait.id]) {
        if (trait.type === 'jing') {
          jingCount++;
          dimScores[dim.id].jing++;
        } else {
          hanCount++;
          dimScores[dim.id].han++;
        }
      }
    });
  });

  const total = jingCount + hanCount;
  const score = total > 0 ? Math.round((jingCount / total) * 100) : 0;

  const dimResults = dimensions.map(dim => {
    const d = dimScores[dim.id];
    const dTotal = d.jing + d.han;
    const dScore = dTotal > 0 ? Math.round((d.jing / dTotal) * 100) : null;
    return {
      id: dim.id,
      name: dim.name,
      icon: dim.icon,
      jing: d.jing,
      han: d.han,
      score: dScore,
      total: dTotal,
    };
  });

  return { score, jingCount, hanCount, total, dimResults };
}

// --- 显示结果 ---
function showResult() {
  const { score, jingCount, hanCount, total, dimResults } = calculateScore();
  const interpretation = getInterpretation(score);

  const resultSection = document.getElementById('result');

  resultSection.innerHTML = `
    <!-- 报告头部（打印可见） -->
    <div class="print-only report-header">
      <img class="report-logo" src="logo.png" alt="青稞家庭教育">
      <h2 class="report-title">先天气质评估报告</h2>
      <p class="report-date">评估日期：${new Date().toLocaleDateString('zh-CN', {year:'numeric',month:'long',day:'numeric'})}</p>
    </div>

    <!-- 总分卡片 -->
    <div class="score-card">
      <p style="font-size:0.85rem;color:var(--color-text-muted);margin-bottom:4px;">
        孩子的先天气质偏向
      </p>
      <div class="score-meter">
        <span class="score-number" style="color: ${interpretation.color}">${score}</span>
        <span class="score-suffix">/ 100</span>
      </div>
      <div class="score-label" style="background: ${interpretation.bgColor}; color: ${interpretation.color}">
        ${interpretation.label}
      </div>
      <p class="score-desc">${interpretation.desc}</p>

      <!-- 谱系条 -->
      <div class="spectrum-bar">
        <div class="spectrum-indicator" style="left: ${score}%"></div>
      </div>
      <div class="spectrum-labels">
        <span>🧸 憨娃<br><small>钝感型</small></span>
        <span>🦊 精娃<br><small>高敏型</small></span>
      </div>
      <p style="margin-top: 12px; font-size: 0.85rem; color: var(--color-text-muted);">
        基于 ${total} 项选中特征：精娃特征 ${jingCount} 项 · 憨娃特征 ${hanCount} 项
      </p>
    </div>

    <!-- 已选特征 -->
    <div class="selected-traits-card">
      <h3>📝 您的选择</h3>
      ${renderSelectedTraits()}
    </div>

    <!-- 各维度分析 -->
    <div class="dimension-analysis">
      <h3>📊 各维度精憨分布</h3>
      <p style="font-size:0.8rem;color:var(--color-text-muted);text-align:center;margin-bottom:14px;">
        越偏左越"憨"，越偏右越"精"——看清孩子在不同维度的独特面貌
      </p>
      ${dimResults.map(d => renderDimRow(d)).join('')}
      <p style="font-size: 0.75rem; color: var(--color-text-muted); text-align: center; margin-top: 12px;">
        * 仅展示有勾选特征的维度
      </p>
    </div>

    <!-- 个性化培养建议 -->
    ${renderAdviceCards(interpretation)}

    <!-- 咨询入口 -->
    <div class="contact-card" style="animation: fade-up 0.5s ease 0.6s both;">
      <div class="contact-header">
        <span class="contact-avatar">💬</span>
        <div class="contact-title">
          <h4>想进一步了解？</h4>
          <p>家庭教育现状梳理 | 养育模式溯源 | 孩子心理成长分析</p>
        </div>
      </div>
      <div class="contact-info">
        <div class="contact-row">
          <span class="contact-label">咨询老师</span>
          <span class="contact-value">来来老师</span>
        </div>
        <div class="contact-qr-row">
          <span class="contact-label">扫二维码</span>
          <div class="contact-qr-wrap">
            <img class="contact-qr-img" src="来来老师.png" alt="来来老师微信二维码" width="120" height="120">
          </div>
        </div>
        <p class="contact-hint">添加请备注"气质评估"</p>
      </div>
    </div>

    <!-- 操作按钮组 -->
    <div class="result-actions">
      <button class="btn-download" onclick="downloadReport()">📥 下载报告</button>
      <button class="btn-retest" onclick="resetAll()">🔄 重测</button>
    </div>
  `;

  // 显示结果区域
  resultSection.classList.remove('result-hidden');
  resultSection.classList.add('result-visible');

  // 平滑滚动到结果
  setTimeout(() => {
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);

  // 切换按钮
  document.getElementById('submit-btn').style.display = 'none';
  document.getElementById('reset-btn').style.display = 'block';

  saveState();
}

// --- 渲染培养建议卡片 ---
function renderAdviceCards(interp) {
  if (!interp.sections) return '';

  let html = '';

  // 类型专属建议
  html += `<h3 class="result-section-title">🎯 ${interp.type}个性化培养方案</h3>`;

  interp.sections.forEach((sec, i) => {
    html += `
    <div class="advice-section" style="animation: fade-up 0.5s ease ${0.2 + i * 0.1}s both;">
      <h4 class="advice-section-title">${sec.title}</h4>
      <ul class="advice-list">
        ${sec.points.map(p => `<li>${p}</li>`).join('')}
      </ul>
    </div>`;
  });

  // 关键词总结
  html += `
  <div class="advice-summary" style="animation: fade-up 0.5s ease ${0.2 + interp.sections.length * 0.1}s both;">
    <div class="advice-summary-tag">
      <span>🔑 ${interp.type}培养关键词</span>
      <strong>${interp.keywords}</strong>
    </div>
    <p>${interp.summary}</p>
  </div>`;

  // 通用模块（所有类型都展示）
  const universal = getUniversalSections();
  html += `<h3 class="result-section-title" style="margin-top:24px;">🧬 通用育儿基石（适用所有气质类型）</h3>`;

  universal.forEach((sec, i) => {
    html += `
    <div class="advice-section universal-section" style="animation: fade-up 0.5s ease ${0.4 + interp.sections.length * 0.1 + i * 0.1}s both;">
      <h4 class="advice-section-title">${sec.title}</h4>
      <ul class="advice-list">
        ${sec.points.map(p => `<li>${p}</li>`).join('')}
      </ul>
    </div>`;
  });

  return html;
}

// --- 渲染维度行 ---
function renderDimRow(d) {
  if (d.total === 0) return '';

  const pct = d.score;
  const barColor = pct >= 55 ? 'var(--color-jing)' : 'var(--color-han)';

  const side = pct >= 55 ? '偏精' : '偏憨';

  return `
    <div class="dim-row">
      <span class="dim-label">${d.icon} ${d.name}</span>
      <div class="dim-bar-bg">
        <div class="dim-bar-fill" style="width: ${pct}%; background: ${barColor};"></div>
      </div>
      <span class="dim-pct">${side}</span>
    </div>
  `;
}

// --- 培养建议库（基于青稞家庭教育体系） ---

// --- 通用培养模块（适用所有类型） ---
function getUniversalSections() {
  return [
    {
      title: '🏠 心理健康四大基石',
      points: [
        '<b>基石一：稳定的安全岛</b> — 每天专心的亲子游戏或阅读时光，及时而恰当地回应孩子的需求。安全感来自日常生活中持续稳定的爱与支持，而不是"你再不听话就不要你了"的威胁。',
        '<b>基石二：情绪调节力</b> — 四步法：帮孩子说出感觉（"你现在很生气"）→ 接纳情绪（"这很正常"）→ 设立边界（"但不能打人"）→ 引导建设性行动（"我们一起收拾好"）。让孩子知道情绪可以被接纳，但行为需要被引导。',
        '<b>基石三：恰当的自主权</b> — 从小事开始给孩子有限选择（"红色杯子还是蓝色杯子？"），让 TA 体验掌控感。自主权不是放任，而是在安全的框架内逐步扩大选择范围。',
        '<b>基石四：社交练习场</b> — 从家庭内部角色扮演开始，到固定玩伴的小圈子，再到更复杂的社交场景。孩子间的冲突不急于介入，先观察，给他们自己解决的机会，事后一起复盘。',
      ]
    },
    {
      title: '⚠️ 家长常见误区',
      points: [
        '<b>过度保护，过度代劳</b> — 孩子一遇困难就帮忙解决，反而让孩子失去自己思考和面对问题的机会。学会"有克制地陪伴"。',
        '<b>随意贴"心理标签"</b> — 把孩子的内向、脾气大随意解读为"自闭""多动症"，或者在孩子面前讨论其"问题"，会给孩子造成消极心理暗示。',
        '<b>只重学习，忽视劳动和锻炼</b> — 孩子需要真实的、力所能及的挑战（家务、运动）来磨炼意志和培养责任感。',
        '<b>父母教育不一致</b> — 夫妻需私下达成共识，避免互相拆台，防止孩子"挑拨离间"从中渔利。',
      ]
    },
  ];
}

// --- 精娃培养建议（融合青稞体系 + PPT讲座） ---
function getJingAdvice() {
  return {
    type: '精娃（高敏型/"雷达"型）',
    sections: [
      {
        title: '🤝 亲子关系：真实 + 松弛 + 共情',
        points: [
          '精娃对虚伪零容忍，采用"有求才应，不多不少；不来不接，一接就走"原则，避免陷入情绪操控与妥协的循环',
          '使用"共情命名 + 认知调整"沟通法：先帮 TA 命名感受（"妈妈知道你很委屈"），再帮 TA 理性解读——"那个小朋友不是故意不跟你玩，他只是还没准备好"',
          '在洗碗、做饭、晒衣服等共同做事中随意聊天，而非刻意说教，逐步打破孩子的防御心理',
          '每天睡前 5-10 分钟肢体接触：拍拍背、摸摸头——精娃心思重，肢体接触比语言更能传递安全感',
          '适度放手让孩子试错，用平静陈述后果代替强迫说教，比如"不洗澡的话身上会有味道，妈妈不太舒服哦"',
        ]
      },
      {
        title: '📚 学习动力：把学习变成"被需要"',
        points: [
          '真实示弱："这道题妈妈怎么都算不对，你能教教我吗？"让孩子体验被需要的成就感，这种成就感会迁移到学习中',
          '在生活中自然融入知识：做饭算调料比例（数学），收快递算箱子体积（几何），关键是事后不追问"学会了吗"',
          '孩子不写作业时不催不骂，第二天被老师批评后平静说："这是你需要面对的结果，妈妈相信你能处理好"',
          '当孩子说"学不会"时，回应"这个确实很难，学不会很正常，我们一起想办法"，让 TA 知道学习困难不影响被爱',
        ]
      },
      {
        title: '🌟 社交与品格：引导格局，破除"我执"',
        points: [
          '精娃察言观色能力极强，容易拿捏家长，家长需坚定立场建立清晰家庭规则，避免被孩子的情绪操控',
          '精娃精力过剩，需引导其将个人兴趣与集体、社会需要结合，建立建设性的长期目标，避免沉迷"小情小爱"',
          '精娃容易过度解读社交信号（"老师是不是不喜欢我"），家长要帮 TA 做认知调整而非一味共情——"老师要管很多小朋友，不是针对你"',
          '多安排运动、户外挑战等活动帮精娃释放过剩精力，用身体疲劳换来情绪平稳',
        ]
      },
    ],
    keywords: '真实、放手、引导格局',
    summary: '精娃是一把双刃剑——培养得当是管理型人才，过度放纵则可能变得自私自利。核心是将高敏感度和自主性转化为领导力和建设性，避免陷入内耗和操控。接纳孩子的敏感特质，但不被其情绪绑架。',
  };
}

// --- 憨娃培养建议（融合青稞体系 + PPT讲座） ---
function getHanAdvice() {
  return {
    type: '憨娃（钝感型/"坦克"型）',
    sections: [
      {
        title: '🤝 亲子关系：耐心等待 + 具体激励',
        points: [
          '憨娃是"慢热型坦克"——启动慢但稳定性高，家长需给予充足的适应时间，耐心比催促有效一百倍',
          '停止"无意识包办"：孩子说渴立刻递水、说难立刻帮忙，这是憨娃问题的最大根源。学会等一等，让 TA 自己尝试',
          '用具体的夸奖代替笼统的"真棒"："你今天自己把积木搭得这么高，而且很稳，你是怎么做到的？"',
          '多创造成功体验：憨娃容易因为失败而退缩，从小任务开始让 TA 不断积累"我能行"的信心',
          '憨娃被动，需要父母主动发起互动——不是等 TA 来找你，而是你主动走进 TA 的世界',
        ]
      },
      {
        title: '📚 学习习惯：兴趣切入 + 结构化训练',
        points: [
          '优先培养生活自理、劳动、规律作息等基础能力——这是自信和规则意识的基石，比学知识更重要',
          '用具体、有趣的活动带动学习：不说"去学习"，而说"我们一起玩一个数学闯关游戏吧"',
          '憨娃是兴趣驱动型，一旦对某个领域产生兴趣会全情投入——帮 TA 找到那个点燃热情的方向比任何补习都重要',
          '学习新知识需要反复练习，一旦掌握就很牢固。不要因为"慢"而焦虑，慢工出细活是憨娃的天然优势',
        ]
      },
      {
        title: '🌟 社交情商：像教知识一样教社交',
        points: [
          '憨娃不擅长观察和模仿社交规则，家长需像教数学一样教社交——"见到长辈要说阿姨好""收到礼物要说谢谢"',
          '利用家庭聚会、固定玩伴等安全环境，事前指导 → 事中陪伴 → 事后复盘，三步循环逐步建立社交信心',
          '憨娃容易被误解为"笨"或"冷漠"，其实只是反应慢——帮 TA 向别人解释，也帮 TA 理解自己不是"有问题"',
          '通过游戏培养延迟满足和抗挫力：比如种植植物等待发芽、完成一个拼图才能看动画片',
        ]
      },
    ],
    keywords: '耐心、陪伴、夯实基础',
    summary: '憨娃是未经雕琢的璞玉，慢热不等于迟钝，单纯不等于弱势。"坦克型"孩子一旦找到方向，稳定性远超精娃。核心是通过持续的"厚爱+严管"，帮助 TA 建立基础能力和自信，逐步适应社会。',
  };
}

function getInterpretation(score) {
  if (score >= 80) {
    return {
      label: '🦊 典型的精娃（高敏型）',
      color: '#ea580c',
      bgColor: '#fff7ed',
      desc: '孩子天生对环境高度敏感，观察力强，反应灵敏，灵活度高。自主意识很强，善于隐藏意图，目标驱动，社交学习能力突出。处事待人成熟老到，具备较强的长期规划能力。',
      ...getJingAdvice(),
    };
  }
  if (score >= 50) {
    return {
      label: '😎 偏精娃',
      color: '#f97316',
      bgColor: '#fff7ed',
      desc: '孩子整体偏向高敏型，有一定的观察力和社交意识，主意比较正，但也保留了一些憨直和单纯的一面。灵活性好但不过度，精中带憨是比较理想的状态。',
      ...getJingAdvice(),
    };
  }
  if (score >= 20) {
    return {
      label: '😊 偏憨娃（偏钝感型）',
      color: '#6366f1',
      bgColor: '#eef2ff',
      desc: '孩子整体偏向钝感型/启动缓慢型，心态好、不计较得失，沉浸在自己的世界里自得其乐。对外界的认可需求较低，给人安全感和信任感。做事是兴趣驱动型的，一旦沉浸其中就很专注。',
      ...getHanAdvice(),
    };
  }
  // score < 20
  return {
    label: '🧸 典型的憨娃/朴娃（钝感型）',
    color: '#4f46e5',
    bgColor: '#eef2ff',
    desc: '孩子是典型的启动缓慢型气质，钝感强，启动慢但稳定性高。不隐藏意图，表达直接干脆，容易让人产生信任感。沉浸在自己世界里的时候专注度极高，对他人认可需求低，内耗极少。"傻人有傻福"——在人际关系中往往更受欢迎，获得的机会也更多。',
    ...getHanAdvice(),
  };
}

// --- 下载报告 ---
function downloadReport() {
  window.print();
}

// --- 渲染已选特征列表 ---
function renderSelectedTraits() {
  let html = '';
  dimensions.forEach(dim => {
    const selected = dim.traits.filter(t => checkedState[t.id]);
    if (selected.length === 0) return;
    html += `
    <div class="selected-dim">
      <span class="selected-dim-icon">${dim.icon}</span>
      <span class="selected-dim-name">${dim.name}</span>
      <ul class="selected-list">
        ${selected.map(t => `<li class="selected-item ${t.type}">${t.label}</li>`).join('')}
      </ul>
    </div>`;
  });
  return html;
}

// --- 保存状态 ---
function saveState() {
  const checkedIds = Object.keys(checkedState);
  sessionStorage.setItem('jinghan_result', JSON.stringify({ checkedIds }));
}

// --- 重置 ---
function resetAll() {
  Object.keys(checkedState).forEach(key => delete checkedState[key]);

  document.querySelectorAll('.trait-item').forEach(item => item.classList.remove('checked'));

  const resultSection = document.getElementById('result');
  resultSection.classList.remove('result-visible');
  resultSection.classList.add('result-hidden');
  resultSection.innerHTML = '';

  document.getElementById('submit-btn').style.display = 'block';
  document.getElementById('reset-btn').style.display = 'none';

  updateSubmitButton();

  sessionStorage.removeItem('jinghan_result');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 抖动动画 ---
function shakeElement(el) {
  el.style.animation = 'none';
  el.offsetHeight;
  el.style.animation = 'shake 0.4s ease';
  setTimeout(() => { el.style.animation = ''; }, 400);
}

const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    50% { transform: translateX(6px); }
    75% { transform: translateX(-4px); }
  }
`;
document.head.appendChild(shakeStyle);
