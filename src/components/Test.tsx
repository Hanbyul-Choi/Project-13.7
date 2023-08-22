'use client';
import React from 'react';

import { useDialog } from './common/Dialog';

export default function Test() {
  const { Alert, Confirm } = useDialog();
  Alert('오픈 알림 신청이 완료되었습니다!', '챌린지가 오픈되면 알려드려요 :)', '북극곰');

  const text = async () => {
    Confirm('삭제하시겠습니까?', '삭제된 글은 되돌릴 수 없습니다.');
  };
  text();
  return <div>Test</div>;
}
