---
layout: default
---
{% assign verb = site.data.german_verbs | where: '単語', page.title | first %}

<style>
    .verb-header { text-align: center; border-bottom: 2px solid #ccc; padding-bottom: 10px; margin-bottom: 20px; }
    .verb-header h1 { font-size: 2.5em; color: #333; margin: 0; }
    .etymology { font-size: 1.1em; color: #1976d2; font-style: italic; margin-top: 5px; }
    .meaning-jp { font-size: 1.4em; font-weight: bold; margin: 20px 0 5px 0; }
    .meaning-en { font-style: italic; margin-bottom: 25px; }
    .detail-item { display: flex; margin-bottom: 6px; }
    .detail-label { width: 90px; font-weight: normal; margin-right: 10px; color: #555; }
    .german-term { font-family: 'Consolas', monospace; font-style: italic; }
    .example-section { margin-top: 25px; }
    .example-box { border-left: 2px solid #333; padding-left: 10px; margin-bottom: 15px; }
    .german-sentence { font-weight: normal; margin: 0; }
    .japanese-translation { font-size: 0.9em; color: #666; margin: 0; line-height: 1.2; }
    .derived { margin-top: 20px; border-top: 1px dashed #ccc; padding-top: 10px; }
</style>

<div class="verb-card">
    <div class="verb-header">
        <h1>{{ verb.単語 }}</h1>
        <div class="etymology">{{ verb.接頭辞 }} + {{ verb.基幹 }}</div>
    </div>

    <div class="meaning-jp">{{ verb.意味 }}</div>
    <div class="meaning-en">to {{ verb.対応英単語 }}</div>

    <div class="detail-section">
        <div class="detail-item">
            <span class="detail-label">構成 :</span>
            <span class="detail-value">{{ verb.接頭辞 }} ({{ verb.接頭辞基本意味 }}) + {{ verb.基幹 }}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">語感 :</span>
            <span class="detail-value">{{ verb.語感 }}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">構文 :</span>
            <span class="detail-value"><span class="german-term">{{ verb.構文 }}</span></span>
        </div>
        <div class="detail-item">
            <span class="detail-label">活用 :</span>
            <span class="detail-value">...</span> </div>
    </div>

    <div class="example-section">
        <div class="example-box">
            <p class="german-sentence">{{ verb.例文1 }}</p>
            <p class="japanese-translation">（{{ verb.日本語訳1 }}）</p>
        </div>
        {% if verb.例文2 %}
        <div class="example-box">
            <p class="german-sentence">{{ verb.例文2 }}</p>
            <p class="japanese-translation">（{{ verb.日本語訳2 }}）</p>
        </div>
        {% endif %}
    </div>

    <div class="derived">
        🔤 <span class="german-term">{{ verb.派生語 }}</span>
    </div>
</div>
