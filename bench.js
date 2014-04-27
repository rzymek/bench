if (Meteor.isClient) {
    UI.registerHelper('sget', function(key) {
        return Session.get(key);
    });

    Template.hello.events({
        'click .call': function() {
            var start = Date.now();
            Meteor.call('hello', function(err, serv) {
                var end = Date.now();
                Session.set('time', [end - start, serv - start, end - serv]);
                Session.set('out', [start, serv, end]);
            });
        },
        'click .ajax': function() {
            var start = Date.now();
            $.get('/now', function(serv) {
                var end = Date.now();
                Session.set('time', [end - start, serv - start, end - serv]);
                Session.set('out', [start, serv, end]);
            });
        }
    });
}
Router.map(function() {
    this.route('default', {
        path: '/',
        template: 'hello'
    });
    this.route('ajax', {
        path: '/now',
        where: 'server',
        action: function() {
            this.response.end('' + Date.now());
        }
    });
});

if (Meteor.isServer) {
    Meteor.startup(function() {
    });
    Meteor.methods({
        hello: function() {
            return Date.now();
        }
    });
}
