# Cheat sheet: https://www.gnu.org/software/make/manual/html_node/Quick-Reference.html
CSS_DEPENDENCY = styles/_variables.css

ASSETS_IMAGES := $(wildcard assets/image/*)
ASSETS_FONTS := $(wildcard assets/fonts/*)

KALEI_DIR = kalei/css/blocks
KALEI_CSS := $(patsubst styles/%,kalei/css/%, $(wildcard styles/blocks/*.css) )
KALEI_DEST_FONTS_DIR = kalei/assets/fonts
KALEI_DEST_FONTS := $(patsubst assets/fonts/%,kalei/assets/fonts/%, $(ASSETS_FONTS) )
KALEI_DEST_IMAGES := $(patsubst assets/image/%,kalei/assets/image/%, $(ASSETS_IMAGES) )

PROD_CSS_BLOCKS :=  $(patsubst styles/%,site/css/%, $(wildcard styles/blocks/*.css) )
PROD_DEST_FONTS_DIR = site/assets/fonts
PROD_DEST_FONTS := $(patsubst assets/fonts/%,site/assets/fonts/%, $(ASSETS_FONTS) )
PROD_DEST_IMAGES := $(patsubst assets/image/%,site/assets/image/%, $(ASSETS_IMAGES) )
PROD_CSS_BUNDLE := styles/bundle.css styles/base.css styles/font.css styles/grid.css styles/icons.css styles/blocks/f-content.css styles/blocks/f-left-heading.css styles/blocks/f-text.css styles/blocks/f-media.css styles/blocks/f-white-card.css styles/blocks/f-button-group.css styles/blocks/f-spacer.css styles/blocks/f-one-liner.css styles/blocks/f-list.css styles/blocks/f-footer.css styles/blocks/f-sitemap.css styles/blocks/f-signup.css styles/blocks/f-icon-list.css styles/blocks/f-footer-text.css styles/blocks/f-accordian.css styles/blocks/f-radio-group.css styles/blocks/f-text-input.css styles/blocks/f-button-basic.css styles/blocks/f-team-cards.css styles/blocks/f-huge-heading.css styles/blocks/f-info-card.css styles/blocks/f-button-organize.css styles/blocks/f-hero.css styles/blocks/f-progress.css styles/blocks/f-project-thumbnail.css styles/blocks/f-miniproject-thumbnail.css styles/blocks/f-button-donate.css styles/blocks/f-button-icon.css styles/blocks/f-right-heading.css styles/blocks/f-modal.css styles/blocks/f-payment-form.css styles/blocks/f-postpay-heading.css styles/blocks/f-postpay-info.css


all: $(KALEI_CSS) kalei/css/base.css kalei/css/styleguide.css \
kalei/css/grid.css kalei/css/icons.css $(KALEI_DEST_FONTS) \
$(KALEI_DEST_IMAGES)

.phony: clean prod debug bugz

debug:
	@echo $(KALEI_CSS)

bugz: kalei/css/bugz/99.99.css

kalei/css/bugz/%.css: styles/bugz/%.css
	npm run postcss -- --output $@ $<

clean:
	rm -r site/assets; \
	rm -r $(KALEI_DIR); \
	rm -r kalei/assets; \
	rm kalei/css/base.css; \
	rm kalei/css/styleguide.css; \
	rm kalei/css/grid.css; \
	rm kalei/css/icons.css; \

# production build
prod: $(PROD_DEST_IMAGES) site/css/bundle.css $(PROD_CSS_BLOCKS) $(PROD_DEST_FONTS) $(CSS_DEPENDENCY) site/css/blocks/f-navigation.css
	@echo "Finish moving images and building our production CSS"

# compile first bundle
site/css/bundle.css: $(PROD_CSS_BUNDLE) $(CSS_DEPENDENCY)
	@npm run postcss:prod -- --output $@ $<

# compile blocks
site/css/blocks/%.css: styles/blocks/%.css $(CSS_DEPENDENCY)
	@npm run postcss:prod -- --output $@ $<

# font files into site
$(PROD_DEST_FONTS): | $(PROD_DEST_FONTS_DIR)

$(PROD_DEST_FONTS_DIR):
	npm run mkdir -- $(PROD_DEST_FONTS_DIR)

$(PROD_DEST_FONTS_DIR)/%: assets/fonts/%
	npm run cp -- $< $@

site/assets/image/%: assets/image/%
	npm run cp -- $< $@

# kalei builds
$(KALEI_DIR)/%.css: styles/blocks/%.css $(CSS_DEPENDENCY)
	npm run postcss -- --output $@ $<

$(KALEI_CSS): | $(KALEI_DIR)

$(KALEI_DIR):
	npm run mkdir -- $(KALEI_DIR)

kalei/css/styleguide.css: styles/styleguide.css $(CSS_DEPENDENCY)
	npm run postcss:no-import -- --output $@ $<

kalei/css/base.css: styles/base.css $(CSS_DEPENDENCY)
	npm run postcss -- --output $@ $<

kalei/css/grid.css: styles/grid.css $(CSS_DEPENDENCY)
	npm run postcss -- --output $@ $<

# do not use postcss because we lose font-feature-settings
# TODO: create an issue in the correct repo for loosing font-feature-settings
kalei/css/icons.css: styles/icons.css $(CSS_DEPENDENCY)
	npm run cp -- $< $@

# font files into kalei
$(KALEI_DEST_FONTS): | $(KALEI_DEST_FONTS_DIR)

$(KALEI_DEST_FONTS_DIR):
	npm run mkdir -- $(KALEI_DEST_FONTS_DIR)

# NOT WORKING vpath %.jpg assets/image
$(KALEI_DEST_FONTS_DIR)/%: assets/fonts/%
	npm run cp -- $< $@

kalei/assets/image/%: assets/image/%
	npm run cp -- $< $@