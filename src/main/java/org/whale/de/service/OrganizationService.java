package org.whale.de.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.whale.de.dao.OrganizationDao;
import org.whale.de.domain.Organization;
import org.whale.system.dao.BaseDao;
import org.whale.system.dao.Page;
import org.whale.system.service.BaseService;

/**
 *  管理
 *
 * @Date 2017-08-01
 */
@Service
public class OrganizationService extends BaseService<Organization, Long> {
	private static Logger logger = LoggerFactory.getLogger(OrganizationService.class);

	@Autowired
	private OrganizationDao organizationDao;
	
	@Override
	public BaseDao<Organization, Long> getDao() {
		return organizationDao;
	}
	
	/**
	 * 分页查询
	 * @param page
	 * @param paramMap
	 */
	public void queryOrganizationPage(Page page,Map<String,String> paramMap) {
		organizationDao.queryOrganizationPage(page,paramMap);
	}
	
	/**
	 * 查询机构数据（机构类型-->List<机构单位>）
	 * @param fileType 1收文；2发文
	 * @param dictFileSource 文件来源，针对收文
	 * @return
	 */
	public Map<String, List<Organization>> queryOrganizationMap(Integer fileType, String dictFileSource){
		List<Organization> organizationList = organizationDao.queryOrganizations(fileType, dictFileSource);
		if(CollectionUtils.isEmpty(organizationList)){
			return Collections.emptyMap();
		}
		Map<String, List<Organization>> retMap = new LinkedHashMap<String, List<Organization>>();
		for (Organization organization : organizationList) {
//			String orgCategory = DictCacheService.getThis().getItemLabel("DICT_ORG_CATEGORY", organization.getDictOrgCategory());
			String orgCategory = organization.getDictOrgCategory();
			List<Organization> dictOrgCategoryList = retMap.get(orgCategory);
			if (dictOrgCategoryList == null) {
				dictOrgCategoryList = new ArrayList<>();
				retMap.put(orgCategory, dictOrgCategoryList);
			}
			dictOrgCategoryList.add(organization);
		}
		return retMap;
	}
}