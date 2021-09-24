import React from 'react';
import ReactAntSelectCascader from '../../src/main';
import styled from 'styled-components';

import nx from '@jswork/next';
import '@jswork/next-key-map';

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;
`;
const headers = {
  'Content-Type': 'application/json',
  'authorization':
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1dHlwIjoiTERBUF9VU0VSIiwiYXVkIjpbImFvc3AtZ2F0ZXdheSIsIml5eS1hcGkiLCJhb3QiLCJ2d29wcyIsIm5vdGlmaWNhdGlvbi1jZW50ZXItYWRtaW4iLCJhb2MtYWRtaW4iXSwic3ViIjoiYXJpYy56aGVuZyIsImlzcyI6ImFsbzcuY29tIiwiZXhwIjoxNjMyNDg1OTI4LCJqdGkiOiIyZTZlZWM3OC1jMTkyLTQ1MTEtYmIxMi0xNTA0YTk2Y2QyOGQifQ.CJOZ_r2TEkl3bZEqsH8VDeXcum0UHnorl21Ir-o8UK9RyipB1eFZYf0obfkDglyWC-2rHnPMmpW5VgHhDGWOCwPwM503-u0KBVkk5yhsCWnvEyBEwNoOn_k-auOd7NsWHoiT4z5-GnABMAlWe5e3BlO_3InzoBueMvatEY6tidM',
  'baseinfo': '0,6847'
};

const query = [
  () => {
    return fetch(
      'https://aosp-gateway.beta.saybot.net/ace-kellis/api/v1/course_series_english?pageNo=0&pageSize=10&name=',
      { headers }
    )
      .then((r) => r.json())
      .then((res) => {
        const items = nx.keyMap(res.result, {
          uuid: 'value',
          cnName: 'label'
        });
        return { items, total: res.totalCount };
      });
  },
  (id) => {
    return fetch(
      `https://aosp-gateway.beta.saybot.net/ace-kellis/api/v1/course_english?pageSize=1000&courseSeriesUuid=${id}`,
      { headers }
    )
      .then((r) => r.json())
      .then((res) => {
        console.log('result:', res);
        const items = nx.keyMap(res.result, {
          uuid: 'value',
          cnName: 'label'
        });
        return { items, total: res.totalCount };
      });
  }
];

export default (props: any) => {
  return (
    <Container>
      <ReactAntSelectCascader
        query={query}
        onChange={(e) => {
          console.log('e:', e.target.value);
        }}
      />
    </Container>
  );
};
