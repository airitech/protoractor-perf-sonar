Performance measure on Protoractor
====

Protoractor上でのE2Eテストにおいて、
正確なユーザ体感速度計測を提供します。

# Description

SPAにおいて、指定操作から特定要素の表示までの処理時間を計測可能です。<br>
画面遷移の時間ではなく、ユーザの操作から、特定要素の表示までを計測するため、<br>
より、ユーザ体感速度を正確に計測することができます。

# Requirement

|No  |ライブラリ名  |概要  |
|---|---|---|
|1|Protoractor|本プログラムはProtoractor上で動作します。|

# Usage

## install

```js
npm install protoractor-perf-sonar --save-dev
```

## method usage

### 特定要素表示まで計測
```js
perfSonar.untilShow(showTagSelector);
```

### 特定要素非表示まで計測

```js
perfSonar.untilHide(hideTagSelector);
```

### 計測値の取得

```js
var promise = perfSonar.end();
promise.then(function(measureTime) {
  // measureTimeが測定結果となります。
});
```

### 各変数について

|No  |変数名  |概要  |
|---|---|---|
|1|showTagSelector/|計測完了とする表示対象をcssセレクタを用いて指定します。<br>指定セレクタで一つでも要素が見つかれば計測終了となります。<br>一度も要素が非表示とならない場合は計測できません。<br>ng-ifによって、隠れている要素が表示する場合は、子要素を指定することが可能です。<br>ng-showやng-hideで表示を切り替える場合は、ng-showやng-hideが記載されているタグを指定しないと計測できません。|
|2|hideTagSelector|計測完了とする非表示対象をcssセレクタを用いて指定します。<br>指定セレクタが一つも見つからなくなった時点で計測終了となります。<br>一度も要素が表示とならない場合は計測できません。<br>ng-ifによって、表示している要素が隠れるまで計測したい場合は、子要素を指定することが可能です。<br>ng-showやng-hideで表示を切り替える場合は、ng-showやng-hideが記載されているタグを指定しないと計測できません。|

## example
### 特定要素表示まで計測

```js
const PerfSonar = require('protoractor-perf-sonar');
var perfSonar = new PerfSonar.sonar(browser);

// 計測終了条件を指定する(対象要素が表示になるまで)。
perfSonar.untilShow('.show-target');

// テスト実行
element(by.id('gobutton')).click();

// .show-target要素が表示されるまでの時間を取得
perfSonar.end().then(function(measureTime) {
  console.log('性能計測結果:' + measureTime);
});
```

### 指定操作から特定要素非表示まで計測

```js
const PerfSonar = require('protoractor-perf-sonar');
var perfSonar = new PerfSonar.sonar(browser);

// 計測終了条件を指定する(対象要素が非表示になるまで)。
perfSonar.untilHide('.hide-target');

// テスト実行
element(by.id('gobutton')).click();

// .hide-target要素が非表示になるまでの測定を実施
perfSonar.end().then(function(measureTime) {
  console.log('性能計測結果:' + measureTime);
});
```

# Author
s-nakagawa

# License
[Apache Version 2.0](https://github.com/serive/es-ml-alert/blob/master/LICENSE)