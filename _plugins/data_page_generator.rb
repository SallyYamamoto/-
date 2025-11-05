# _plugins/data_page_generator.rb
# このプラグインは、データファイルに基づいて動的なページを作成します。

module Jekyll
  class DataPageGenerator < Generator
    safe true

    def generate(site)
      # 1. 動詞詳細ページ (/verb/:word) の生成
      site.data['german_verbs'].each do |verb|
        # URLに使われるslugを生成 (例: "abstellen")
        slug = verb['単語'].downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
        
        # コレクション 'verbs' にアイテムを追加
        site.collections['verbs'].docs << DataPage.new(site, site.source, '_verbs', {
          'title' => verb['単語'],
          'path' => slug,
          'layout' => 'verb_detail' # verb_detail.html レイアウトを使用
        })
      end

      # 2. 接頭辞別一覧ページ (/prefix/:prefix) の生成
      site.data['german_verbs'].map { |v| v['接頭辞'] }.uniq.each do |prefix|
        slug = prefix.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
        site.collections['prefixes'].docs << DataPage.new(site, site.source, '_prefixes', {
          'title' => prefix,
          'path' => slug,
          'list_type' => '接頭辞',
          'layout' => 'list_template' # list_template.html レイアウトを使用
        })
      end

      # 3. 基幹別一覧ページ (/stem/:stem) の生成
      site.data['german_verbs'].map { |v| v['基幹'] }.uniq.each do |stem|
        slug = stem.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
        site.collections['stems'].docs << DataPage.new(site, site.source, '_stems', {
          'title' => stem,
          'path' => slug,
          'list_type' => '基幹',
          'layout' => 'list_template'
        })
      end
    end
  end
  
  # ダミーページを生成するためのクラス
  class DataPage < Page
    def initialize(site, base, dir, data)
      @site = site
      @base = base
      @dir  = dir
      @name = "#{data['path']}.html"
      
      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'default.html')
      self.data.merge!(data)
    end
  end
end
