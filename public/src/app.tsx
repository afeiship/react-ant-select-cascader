import React from 'react';
import ReactAntSelectCascader from '../../src/main';
import styled from 'styled-components';
import ReactAntSelect from '@jswork/react-ant-select';
import nx from '@jswork/next';
import '@jswork/next-key-map';

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;
`;

const Item = styled.div`
  strong {
    display: inline-block;
    text-align: left;
    width: 80px;
  }
  margin-bottom: 10px;
`;

const headers = {
  'Content-Type': 'application/json',
  'authorization':
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1dHlwIjoiTERBUF9VU0VSIiwiYXVkIjpbImFvc3AtZ2F0ZXdheSIsIml5eS1hcGkiLCJhb3QiLCJ2d29wcyIsIm5vdGlmaWNhdGlvbi1jZW50ZXItYWRtaW4iLCJhb2MtYWRtaW4iXSwic3ViIjoiYXJpYy56aGVuZyIsImlzcyI6ImFsbzcuY29tIiwiZXhwIjoxNjMyNzQ2MDY1LCJqdGkiOiJkYjMwNmEzZi02MmZhLTQzZjktODM1OC1kMzIzY2Y2ZDc3MWEifQ.C1GicMbSkie2fGKUbzKTej-oKvHeMSLQ2TrSXm4SfXbEgTnkw0TSopyIonQZm_C5WskC97VUHJSlTCthfBzsBAR-DXGHM5MzNbhzb36b1kZk6SHJlBESoPDaCtu2QJYhlI971JxC-j5oXRC3BF-AIisFdHcYGEUWsPI_kRK2H7I',
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
  const labels = ['课程系列', '课程'];
  return (
    <Container>
      <ReactAntSelectCascader
        query={query}
        template={({ index, props }) => {
          return (
            <Item key={index}>
              <strong>{labels[index]}</strong>
              <ReactAntSelect allowClear style={{ width: 200 }} {...props} />
            </Item>
          );
        }}
        onChange={(e) => {
          console.log('e:', e.target.value);
        }}
      />
    </Container>
  );
};
