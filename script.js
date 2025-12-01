/**
 * ブレスケアクリニック LP - JavaScript
 * 
 * 機能一覧:
 * 1. スクロールアニメーション（Intersection Observer）
 * 2. FAQアコーディオン
 * 3. 固定CTAの表示制御
 * 4. スムーススクロール
 * 5. フォームバリデーション
 */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // ============================================
  // 1. スクロールアニメーション
  // ============================================
  const initScrollAnimation = () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length === 0) return;

    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));
  };


  // ============================================
  // 2. FAQアコーディオン
  // ============================================
  const initFaqAccordion = () => {
    const faqItems = document.querySelectorAll('.faq__item');
    
    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
      const question = item.querySelector('.faq__question');
      
      if (!question) return;

      question.addEventListener('click', () => {
        const isActive = item.classList.contains('is-active');
        
        // 他のアイテムを閉じる
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('is-active');
        });
        
        // クリックしたアイテムをトグル
        if (!isActive) {
          item.classList.add('is-active');
        }
      });
    });
  };


  // ============================================
  // 3. 固定CTAの表示制御
  // ============================================
  const initFixedCta = () => {
    const fixedCta = document.querySelector('.fixed-cta');
    
    if (!fixedCta) return;

    const SCROLL_THRESHOLD = 600;

    const handleScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        fixedCta.classList.add('is-visible');
      } else {
        fixedCta.classList.remove('is-visible');
      }
    };

    // 初期状態をチェック
    handleScroll();

    // スクロールイベントをthrottleで最適化
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  };


  // ============================================
  // 4. スムーススクロール
  // ============================================
  const initSmoothScroll = () => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    const headerHeight = 60; // ヘッダーの高さ

    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // href="#" の場合はスキップ
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };


  // ============================================
  // 5. フォームバリデーション
  // ============================================
  const initFormValidation = () => {
    const form = document.querySelector('.form');
    
    if (!form) return;

    form.addEventListener('submit', function(e) {
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(field => {
        // 既存のエラー表示をクリア
        field.classList.remove('is-error');
        
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('is-error');
        }

        // チェックボックスの場合
        if (field.type === 'checkbox' && !field.checked) {
          isValid = false;
          field.classList.add('is-error');
        }
      });

      if (!isValid) {
        e.preventDefault();
        
        // 最初のエラーフィールドにフォーカス
        const firstError = form.querySelector('.is-error');
        if (firstError) {
          firstError.focus();
        }
      }
    });
  };


  // ============================================
  // ユーティリティ関数
  // ============================================
  
  /**
   * 電話番号フォーマット
   * @param {string} tel - 電話番号
   * @returns {string} フォーマット済み電話番号
   */
  const formatTel = (tel) => {
    const cleaned = tel.replace(/\D/g, '');
    
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (cleaned.length === 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    
    return tel;
  };

  /**
   * モバイル判定
   * @returns {boolean}
   */
  const isMobile = () => {
    return window.innerWidth < 900;
  };


  // ============================================
  // 初期化
  // ============================================
  initScrollAnimation();
  initFaqAccordion();
  initFixedCta();
  initSmoothScroll();
  initFormValidation();

});
