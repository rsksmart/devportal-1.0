---
layout: revamp/tutorials
title: Tutorials
---


{% assign visible_tutorials = site.data.tutorialslist.tutorials | where_exp: "tutorial", "tutorial.status != 'inactive'" %}
<div id="grid">
{% for tutorial in visible_tutorials %}
<div id="tutorial-id-{{ tutorial.id }}" class="col-lg-6 col-xl-4 mb-3 item {{ tutorial.category }}">
<a href="{{ tutorial.url }}">    
<div class="tutorial-content tutorial-content-box">
    {% if tutorial.bannerImage %}
<div class="tutorial-image mb-3" style="background-image: url('{{ tutorial.bannerImage }}');">
    {% else %}
    <div class="tutorial-image mb-3" style="background-image: url('/assets/revamp/img/tutorials/banner-images/default.jpg');">
    {% endif %}
<div class="tutorial-meta">
    {{ tutorial.audiences }} . {{ tutorial.duration }}
</div>    
</div>
<div class="tutorial-title mb-3">{{ tutorial.title }}</div>
<div class="tutorial-descrition mb-3">{{ tutorial.description }}</div>
<div class="tutorial-tags-container mb-3">
    {% for tag in tutorial.tags %}
    <span class="tutorial-tag">{{ tag.name }}</span>
    {% endfor %}
</div>
<div class="tutorial-presenter">
    {% if tutorial.presenterImage %}
    <div class="presenter-image" style="background-image: url('{{ tutorial.presenterImage }}');"></div>
    {% else %}
    <div class="presenter-image" style="background-image: url('/assets/revamp/img/tutorials/presenters/default.jpg');"></div>
    {% endif %}
    <div class="presenter-name">{{ tutorial.presenterName }}</div>
</div>
</div>
</a>
</div>
{% endfor %}

</div><!-- grid ends-->
