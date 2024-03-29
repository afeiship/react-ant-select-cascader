# react-ant-select-cascader
> Cascader based on ant select.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/react-ant-select-cascader
```

## usage
1. import css
  ```scss
  @import "~@jswork/react-ant-select-cascader/dist/style.css";

  // or use sass
  @import "~@jswork/react-ant-select-cascader/dist/style.scss";

  // customize your styles:
  $react-ant-select-cascader-options: ()
  ```
2. import js
  ```js
  import React from 'react';
  import ReactAntSelectCascader from '@jswork/react-ant-select-cascader';
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
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1dHlwIjoiTERBUF9VU0VSIiwiYXVkIjpbImFvc3AtZ2F0ZXdheSIsIml5eS1hcGkiLCJhb3QiLCJ2d29wcyIsIm5vdGlmaWNhdGlvbi1jZW50ZXItYWRtaW4iLCJhb2MtYWRtaW4iXSwic3ViIjoiYXJpYy56aGVuZyIsImlzcyI6ImFsbzcuY29tIiwiZXhwIjoxNjMyNTc1NjA5LCJqdGkiOiI5YmE2NDU3OS0wODRmLTQwOTMtOGI0MC1kMDIwOWYwYmVmZjYifQ.AyromYw2qS5s9vXR7h9Gns9ZQbyg47qMfhuxGJh54h8wcyhDRNiF3IhwpGIAgskYPMVu6m-w5rotG7A4OmHSEfcfRw2vzr0inxDuOxo83eehN38ciI3EgTmIQ-IYKQVUcEVZjVG4uheSnfGcRNgjLApstIRDu57m3aGD7L-1DMs',
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
                <ReactAntSelect style={{ width: 200 }} {...props} />
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

  ```

## preview
- https://afeiship.github.io/react-ant-select-cascader/

## license
Code released under [the MIT license](https://github.com/afeiship/react-ant-select-cascader/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/react-ant-select-cascader
[version-url]: https://npmjs.org/package/@jswork/react-ant-select-cascader

[license-image]: https://img.shields.io/npm/l/@jswork/react-ant-select-cascader
[license-url]: https://github.com/afeiship/react-ant-select-cascader/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/react-ant-select-cascader
[size-url]: https://github.com/afeiship/react-ant-select-cascader/blob/master/dist/react-ant-select-cascader.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/react-ant-select-cascader
[download-url]: https://www.npmjs.com/package/@jswork/react-ant-select-cascader
