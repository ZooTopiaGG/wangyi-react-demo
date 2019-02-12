import { asyncFetch } from 'config/fetch';

/**
 * 获取推荐歌单
 * @param {*} payload
 */
export const getPersonalized = async () => await asyncFetch('GET','/personalized');

/**
 * 获取首页banner
 * @param {*} payload
 */
export const getBanner = async () => await asyncFetch('GET','/banner');

/**
 * 获取推荐电台
 * @param {*} payload
 */
export const getDjprogram = async () => await asyncFetch('GET','/personalized/djprogram');
