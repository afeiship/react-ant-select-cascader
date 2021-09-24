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
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1dHlwIjoiTERBUF9VU0VSIiwiYXVkIjpbImFvc3AtZ2F0ZXdheSIsIml5eS1hcGkiLCJhb3QiLCJ2d29wcyIsIm5vdGlmaWNhdGlvbi1jZW50ZXItYWRtaW4iLCJhb2MtYWRtaW4iXSwic3ViIjoiYXJpYy56aGVuZyIsImlzcyI6ImFsbzcuY29tIiwiZXhwIjoxNjMyNTMyMzI3LCJqdGkiOiIyNTIwMmFmYS01Mzc2LTRhM2QtODk1OC1mZTQ1NTMwZjIyMzMifQ.rMDFJ5MUDovDYxiUxN1AGqpiYxsT6uRU-fO7FQBj10NNrI19gY879Fl6yW4T_Uz2LPrTvq50NdztNmvOV2u-FYtDQev0vvtiCYl0U62V2zhoS5KXZtqArbP-fB3FBClNJbKzLy-zFZeJjvVN0SKa8JLn0xWWyFPml7DwWAC-P_c',
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
