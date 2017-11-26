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
|1|Protoractor|本プログラムはProtoractor上で動作します。<br>ProtoractorのVersionはどれでも動作可能です。|
|2|jQeury|jQueryが必要です。<br>jQuery liteでは動作しません。|

# Usage

## install

```js
npm install protoractor-perf-sonar --save-dev
```

## method usage

### 指定操作から特定要素表示まで計測
```js
perfSonar.measureUntilShow(operateTagSelector, eventType, showTagSelector);
```

### 指定操作から特定要素非表示まで計測

```js
perfSonar.measureUntilHide(operateTagSelector, eventType, hideTagSelector);
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
|1|operateTagSelector|計測開始する操作対象の要素をcssセレクタ形式で指定します。|
|2|eventType|計測開始する操作を示すevent名を指定します。<br> ex: click, mousedown, mouseupなど|
|3|showTagSelector/|計測完了とする表示対象をcssセレクタを用いて指定します。<br>指定セレクタで一つでも要素が見つかれば計測終了となります。<br>一度も要素が非表示とならない場合は計測できません。|
|4|hideTagSelector|計測完了とする非表示対象をcssセレクタを用いて指定します。<br>指定セレクタが一つも見つからなくなった時点で計測終了となります。<br>一度も要素が表示とならない場合は計測できません。|

## example
### 指定操作から特定要素表示まで計測

```js
const PerfSonar = require('protoractor-perf-sonar');
var perfSonar = new PerfSonar.sonar(browser);

// 計測開始操作と、計測終了条件を指定する(対象要素が表示になるまで)。
perfSonar.measureUntilShow('#gobutoon', 'click', '.show-target');

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

// 計測開始操作と、計測終了条件を指定する(対象要素が非表示になるまで)。
perfSonar.measureUntilHide('#gobutoon', 'click', '.hide-target');

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