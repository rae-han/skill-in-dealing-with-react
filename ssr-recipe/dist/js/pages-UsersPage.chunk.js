exports.ids=[3],exports.modules={20:function(e,t,c){"use strict";c.r(t);var r=c(3),s=c(15),n=c(2),u=c(0),j=function(e){var t=e.users;return t?Object(u.jsx)("div",{children:Object(u.jsx)("ul",{children:t.map((function(e){return Object(u.jsx)("li",{children:Object(u.jsx)(n.Link,{to:"/users/".concat(e.id),children:e.username})},e.id)}))})}):null},i=c(8),b=c(16),O=function(){var e=Object(s.useSelector)((function(e){return e.users})).users,t=Object(s.useDispatch)();return Object(r.useEffect)((function(){e||t(Object(i.c)())}),[t,e]),Object(u.jsxs)("div",{children:[Object(u.jsx)(j,{users:e}),Object(u.jsx)(b.a,{resolve:i.c})]})},d=function(e){var t=e.user,c=t.email,r=t.name,s=t.username;return Object(u.jsxs)("div",{children:[Object(u.jsxs)("h1",{children:[s," (",r,")"]}),Object(u.jsxs)("p",{children:[Object(u.jsx)("b",{children:"e-mail: "}),c]})]})},l=function(e){var t=e.id,c=Object(s.useSelector)((function(e){return e.users.user})),n=Object(s.useDispatch)();return Object(b.c)((function(){return n(Object(i.b)(t))})),Object(r.useEffect)((function(){c&&c.id===parseInt(t,10)||n(Object(i.b)(t))}),[n,t,c]),c?Object(u.jsx)("div",{children:Object(u.jsx)(d,{user:c})}):null};t.default=function(){return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(O,{}),Object(u.jsx)(n.Route,{path:"/users/:id",render:function(e){var t=e.match;return Object(u.jsx)(l,{id:t.params.id})}})]})}}};