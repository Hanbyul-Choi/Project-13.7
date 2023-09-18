import React, { useState } from 'react';

import Image from 'next/image';

interface CalendarProps {
  isPrevMonth?: boolean;
  isNextMonth?: boolean;
  userReviews: any;
}

const boxStyle = 'border-2 w-24 h-20 px-2 align-top relative group';

const Calendar = ({ isPrevMonth = true, isNextMonth = true, userReviews }: CalendarProps) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentMonth, _] = useState<Date>(new Date());
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const checkCertify = (day: Date) => {
    const certify = userReviews?.filter((item: any) => new Date(item.created_at).getDate() === day.getDate());
    if (!certify?.length) return <></>;
    return (
      <>
        <div className="border-x-2 border-x-green p-[2px] text-center">
          <p className="text-sm font-semibold group">인증완료</p>
          <div className="absolute w-80 h-80 hidden group-hover:block z-10 rounded-lg overflow-hidden">
            <Image src={certify[0].img_url} alt="인증사진" fill />
          </div>
        </div>
      </>
    );
  };

  const buildCalendarDays = () => {
    const curMonthStartDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const curMonthEndDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const prevMonthEndDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0);
    const nextMonthStartDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    const days: Date[] = Array.from({ length: curMonthStartDate }, (_, i) => {
      return new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, prevMonthEndDate.getDate() - i);
    }).reverse();

    days.push(...Array.from({ length: curMonthEndDate.getDate() }, (_, i) => new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1)));

    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      days.push(...Array.from({ length: remainingDays }, (_, i) => new Date(nextMonthStartDate.getFullYear(), nextMonthStartDate.getMonth(), i + 1)));
    }
    return days;
  };

  const buildCalendarTag = (calendarDays: Date[]) => {
    return calendarDays.map((day: Date, i: number) => {
      if (day.getMonth() < currentMonth.getMonth()) {
        return (
          <td key={i} className={`${boxStyle} text-sub4`}>
            {isPrevMonth ? day.getDate() : ''}
          </td>
        );
      }
      if (day.getMonth() > currentMonth.getMonth()) {
        return (
          <td key={i} className={`${boxStyle} text-sub4`}>
            {isNextMonth ? day.getDate() : ''}
          </td>
        );
      }
      return (
        <td key={i} className={`${boxStyle}`}>
          {day.getDate()}
          {checkCertify(day)}
        </td>
      );
    });
  };

  const divideWeek = (calendarTags: JSX.Element[]) => {
    return calendarTags.reduce((acc: JSX.Element[][], day: JSX.Element, i: number) => {
      if (i % 7 === 0) acc.push([day]);
      else acc[acc.length - 1].push(day);
      return acc;
    }, []);
  };

  const calendarDays = buildCalendarDays();
  const calendarTags = buildCalendarTag(calendarDays);
  const calendarRows = divideWeek(calendarTags);

  return (
    <div className="w-full flex flex-col items-center ">
      <div className="calendarNav">
        <span className="text-lg font-bold">{currentMonth.getMonth() + 1}월의 챌린지 참여현황</span>
      </div>
      <table className="mt-4">
        <thead>
          <tr>
            {daysOfWeek.map((day, i) => (
              <th key={i} data-testid="calendarHead" className={`w-20 border-2 ${i === 0 ? 'text-nagative' : i === 6 ? 'text-blue' : ''}`}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarRows.map((row: JSX.Element[], i: number) => (
            <tr key={i} className="w-20  border-2">
              {row}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
