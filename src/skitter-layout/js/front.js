jQuery(function() {
    $('#content').each(function(i, el) {
        $('.teams > .team', el).each(function(j, team) {
            var content = $('.popup', team).html();
            $(team).popup({
                //on: 'click',
                transition : 'fade up',
                position   : 'right center',
                target     : $('.position', team),
                html       : content
            });
        });
    });
    $('#side .ui.sticky')
      .sticky({
        context: '#content'
      })
    ;
});
