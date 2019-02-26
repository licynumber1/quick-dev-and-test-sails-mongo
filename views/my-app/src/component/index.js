import React, { useState, useEffect, useRef } from 'react';

export function Example() {
  // 声明一个名为“count”的新状态变量
  const [time, setTime] = useState(1000);
  const [num, setNum] = useState(0);

  let useInterval = (callback, delay) => {
    const savedCallback = useRef();
    useEffect(() => {
      savedCallback.current = callback;
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [callback]);
  }

  useInterval(() => {
    setNum(num + 1);
  }, time);

  return (
    <div>
      {/*<p>你点击了{count}次</p>*/}
      {/*<button onClick={() => setCount(count + 1)}>*/}
        {/*点我*/}
      {/*</button>*/}
      <p>自动增加到1000：{num}</p>
      <input onChange={(e)=>setTime(~~e.target.value)} value={time}/>
    </div>
  );
}
