import React, { useContext, useEffect, useRef, useState } from "react";
import {AppCtx} from './App'

interface IHelloProps {
  message?: string;
}

const Hello: React.FC<IHelloProps> = (props) => {
  const [obj, setobj] = useState({ like: 0, on: true });
  const themeContext = useContext(AppCtx)
  console.log(themeContext)
  const style = {
    background: themeContext.background,
    color: themeContext.color
  }

  // 多次渲染可以共享一个值,解决useState在每个hooks是独立状态的问题
  const likeRef = useRef(0);

  const didMountRef = useRef(false);

  // dom ref, 可以引用组件的DOM
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   *  1. 在每次 render 之后执行
      2. 接受第二个参数来控制跳过执行，下次 render 后如果指定的值没有变化就不会执行
         useEffect 是在 render 之后浏览器已经渲染结束才执行
   *    a.  不传参: 每次render后执行
        b.  空数组只执行一次
        c.  一个值: 该值发生变化执行
        d.  多个值: 其中一个发生变化就执行
   * 
   *  */
  useEffect(() => {
    document.title = `点击了${obj.like}次`;
  }, [obj]);

  useEffect(() => {
    if (didMountRef.current) {
      console.log("this is updated");
    } else {
      didMountRef.current = true;
    }
  }, []);

  function handleAlert() {
    setTimeout(() => {
      alert("you clicked on" + likeRef.current);
    }, 2000);
  }
  return (
    <div>
      <h2>{props.message}</h2>
      <button
        onClick={() => {
          setobj({ like: obj.like + 1, on: !obj.on });
          likeRef.current++;
        }}
      >
        {obj.like} + {obj.on ? "喜欢" : "不喜欢"}
      </button>
      <button onClick={handleAlert}>alert</button>
      <br />
      <h2>dom ref</h2>
      <input ref={inputRef} type="text" />
      <button
        onClick={() => {
          inputRef.current?.focus();
        }}
      >
        focus
      </button>
      <h2>hello 组件接收context值</h2>
      <div style={style}>test Context</div>
    </div>
  );
};

Hello.defaultProps = {
  message: "Hello World",
};
export default Hello;
