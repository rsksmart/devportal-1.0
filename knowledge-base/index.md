---
layout: revamp/knowledge-base
title: Knowledge Base
---


<div class="row d-flex justify-content-between">
    <div class="col-lg-4 col-sm-12 column-gap-right internal-homepage content-box topic-content top-item">
        <div class="top-item-icon d-flex align-items-end learn">
            <img src="../assets/revamp/img/icons/learn.svg">
        </div>
        <div class="title d-flex align-items-end">
            <h2>LEARN ABOUT RSK AND RIF</h2>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetuer
            adipiscing elit, sed diam nonummy nibh </p>
        <a href="#">Read the docs</a>
    </div>
    <div class="col-lg-4 col-sm-12 column-gap-left internal-homepage content-box topic-content top-item">
        <div class="top-item-icon d-flex align-items-end build">
            <img src="../assets/revamp/img/icons/build.svg">
        </div>
        <div class="title d-flex align-items-end">
            <h2>BUILD DAPPS<br>
                WITH RSK AND RIF</h2>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetuer
            adipiscing elit, sed diam nonummy nibh </p>
        <a href="#">Read the docs</a>
    </div>
    <div class="col-lg-4 col-sm-12 column-gap-left internal-homepage content-box topic-content top-item">
        <div class="top-item-icon d-flex align-items-end financial-technology">
            <img src="../assets/revamp/img/icons/financial-technology.svg">
        </div>
        <div class="title d-flex align-items-end">
            <h2>FINANCIAL TECHNOLOGY <br>WITH RSK AND RIF</h2>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetuer
            adipiscing elit, sed diam nonummy nibh </p>
        <a href="#">Read the docs</a>
    </div>
</div>
<div id="ask-a-question" class="row">
    <div class="col-lg-12 internal-homepage content-box topic-content">
        <h2>TAKE A MOMENT AND ASK A QUESTION</h2>
        <div class="row">
            <div id="knowledge-search-form" class="col-12">
                {% include search-knowledge.html %}
            </div>
        </div>
    </div>
</div>
{% assign visible_knowledges = site.data.knowledgebase.knowledges | where_exp: "knowledge", "knowledge.status != 'inactive'" %}
{% for knowledge in visible_knowledges %}
<div id="top-ten-questions" class="row">
    <div class="col-lg-12 internal-homepage content-box mb-0">
        <h2>Top 10 questions</h2>
        <div class="row">
            <div class="col-12">
                <div class="two_columns">
                    {% for topTen in knowledge.topTen %}
                    <p id="{{ topTen.id }}">
                        <span class="caret-icon"><i class="fa fa-caret-right" aria-hidden="true"></i></span>
                        <a href="{{ topTen.url }}">{{ topTen.question }}</a>
                    </p>
                    {% endfor %}
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-lg-12 internal-homepage title-box topic-content">
        <h2>ALL THE INFORMATION YOU NEED</h2>
    </div>
</div>
<div class="row">
    <div class="col-lg-12 internal-homepage content-box topic-content mb-0">
        <div id="quick-entries" class="row">
            {% for quickEntries in knowledge.quickEntries %}
            <a id="{{ quickEntries.id }}" href="{{ quickEntries.url }}" class="quick-entry custom-border-bottom col-md-4 col-lg-2dot4">
                <div class="icon d-flex align-items-end">
                    <i class="{{ quickEntries.icon }}"></i>
                </div>
                <div class="title d-flex align-items-end">
                    {{ quickEntries.title }}
                </div>
            </a>
            {% endfor %}
        </div>
    </div>
</div>
<div class="row">
    <div class="col-lg-12 internal-homepage title-box topic-content">
        <h2>JOIN OUR TRAINING WEBINAR</h2>
    </div>
</div>
<div class="row">
    <div class="col-12 internal-homepage content-box presentation-box mb-0">
        <div class="row">
            <div class="col-lg-6 col-sm-12 presentation">
                <h3>Getting Started <br>with GetResponse</h3>
                <p><a href="https://www.youtube.com/watch?v=6Y8smAwIGtA&ab_channel=Indorse" target="_blank">Watch now</a>
                    <a href="/quick-start/step1-install-rsk-local-node/" target="_blank">Learn more</a></p>
                <p class="bajada">GetResponse Training Webinar</p>
            </div>
            <div class="col-lg-6 col-sm-12 presentation-image webinars">
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-lg-12 internal-homepage title-box topic-content">
        <h2>Our latest resources</h2>
    </div>
</div>
<div id="latest-ressources-content" class="row d-flex justify-content-between">
    {% for latestRessorces in knowledge.latestRessorces %}
    <a id="{{ latestRessorces.id }}" href="{{ latestRessorces.url }}" class="col-lg-3 col-sm-12 p-0 column-gap-right ressource {{ latestRessorces.ressourceType }}-ressource">
        <div class="ressource-image" style="background-image: url('{{ latestRessorces.image }}');">
            <i class="fa fa-play" aria-hidden="true"></i>
        </div>
        <div class="ressource-excerpt">
            <div class="ellipsis-text">
                {{ latestRessorces.excerpt }}
            </div>
        </div>
        <div class="ressource-title mb-md-5">
            {{ latestRessorces.title }}
        </div>
    </a>
    {% endfor %}
    {% endfor %}
</div>