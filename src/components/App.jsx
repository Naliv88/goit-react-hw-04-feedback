import React, { useState, useEffect } from 'react';
import { FeedbackOptions } from './feedbackOptions/feedbackOptions';
import { Statistics } from './statistics/statistics';
import { Section } from './section/section.jsx';
import { Notification } from './notification/Notification';
import style from "./App.module.css"

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [countTotal, setCountTotal] = useState(0);
  const [countPositive, setCountPositive] = useState(0);

  const onClickBtn = evt => {
    switch (evt.target.name) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;
      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;
      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    setCountTotal(good + neutral + bad);
    setCountPositive(Math.floor((good * 100) / countTotal));
  }, [good, neutral, bad, countTotal]);

  return (
    <div className={style.section}>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={onClickBtn}
        ></FeedbackOptions>
      </Section>
      <Section title="Statistics">
        {countTotal ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotal}
            positivePercentage={countPositive}
          ></Statistics>
        ) : (
          <Notification message="There is no feedback"></Notification>
        )}
      </Section>
    </div>
  );
}
export default App;
