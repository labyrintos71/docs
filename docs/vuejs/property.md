# Vuetify property

Vuetify에서 대부분 공통적으로 사용하는 property들이다.

## dark / light
dark와 light는 component 단위에 theme를 설정하는 property이다.
dark는 검은색 배경에 흰색 글씨, light는 흰색 배경에 검은색 글씨이다.
이 property는 Vuetify instance를 생성할 때 지정한 theme를 자동으로 따라가게 된다.
만약 component와 instance 모두 선언하지 않으면 light로 지정된다.
```css
.theme--light {
  background-color: #fff;
  border-color: #fff;
  color: rgba(0,0,0,.87);
}

.theme--dark {
  background-color: #424242;
  border-color: #424242;
  color: #fff;
}
```
## dense
Vuetify component 들은 대부분 위/아래 padding이 설정되어 있는데, 좀 큰 편이다.
v-alert component 기준으로 기본 값은 16px로 설정되어 있다.
dense property는 이러한 padding을 절반정도 줄여주는 역할을 한다.
기본값은 false 이다.

```css
.dense {
  padding-top: 8px;
  padding-bottom: 8px;
}
```
## tile
border-radius 속성을 없애주는 property이다.
즉, 둥근 테두리를 없애고 각진 테두리를 만들어준다.

```css
.tile {
  border-radius: 0;
}
```
## outlined
theme를 무시하고 배경 색상을 무조건 투명으로 변경한 뒤, 테두리를 얇게 변경한다.

```css
.outlined {
  background: transparent!important;
  border: thin solid!important;
}
```
## hover
component에 mouseover를 하면 약간 pop 되는 듯 한 그림자 효과를 주며,
cursor가 pointer로 변경된다.

```css
.hover {
  cursor: pointer;
  transition: box-shadow .4s cubic-bezier(.25,.8,.25,1);
}
```
## width, min-width, max-width
component의 width, min-width, max-width를 설정한다.
number와 string으로 설정 가능하며, number로 입력시 기본 단위는 px이다.
string으로 하면 단위까지 입력 가능하다.

vuetify는 기본으로 flexbox css를 이용하므로, 따로 width를 지정하지 않으면 내부 content에 자동으로 맞춰진다.

## height, min-height, max-height
component의 height, min-height, max-height를 설정한다.
number와 string으로 설정 가능하며, number로 입력시 기본 단위는 px이다.
string으로 하면 단위까지 입력 가능하다.

vuetify는 기본으로 flexbox css를 이용하므로, 따로 height를 지정하지 않으면 내부 content에 자동으로 맞춰진다.

## tag
component가 화면에 렌더링 될 때 어떤 태그로 렌더링 될 지 선택하는 속성이다.
기본 값은 component 마다 다르지만 보통 div 로 설정되어 있고,
span 이나, li 등으로 변경해서 사용하기도 한다.

