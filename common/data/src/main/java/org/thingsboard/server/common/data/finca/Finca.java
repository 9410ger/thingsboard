/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.thingsboard.server.common.data.finca;

import org.thingsboard.server.common.data.id.FincaId;
import lombok.EqualsAndHashCode;
import org.thingsboard.server.common.data.HasName;
import org.thingsboard.server.common.data.SearchTextBasedWithAdditionalInfo;
import org.thingsboard.server.common.data.id.CustomerId;
import org.thingsboard.server.common.data.id.TenantId;


/**
 *
 * @author German Lopez
 */
@EqualsAndHashCode(callSuper = true)
public class Finca extends SearchTextBasedWithAdditionalInfo<FincaId> implements HasName {

    //private static final long serialVersionUID = 2807343040519543363L;

    private TenantId tenantId;
    private CustomerId customerId;
    private String name;
    private String type;
    private String details;
    
    public Finca(){
        super();
    }
    
    public Finca(FincaId id){
        super(id);
    }
    
    public Finca(Finca finca){
        this.tenantId=finca.getTenantId();
        this.customerId=finca.getCustomerId();
        this.name=finca.getName();
        this.type=finca.getType();
        this.details=finca.getDetails();
    }

    @Override
    public String getSearchText() {
        return getName();
    }

    @Override
    public String getName() {
        return this.name;
    }
    
    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("Finca [tenantId=");
        builder.append(tenantId);
        builder.append(", customerId=");
        builder.append(customerId);
        builder.append(", name=");
        builder.append(name);
        builder.append(", type=");
        builder.append(type);
        builder.append(", additionalInfo=");
        builder.append(getAdditionalInfo());
        builder.append(", createdTime=");
        builder.append(createdTime);
        builder.append(", id=");
        builder.append(id);
        builder.append(" , details=");
        builder.append(details);
        builder.append("]");
        return builder.toString();
    }
    
    /**
     * @return the tenantId
     */
    public TenantId getTenantId() {
        return tenantId;
    }

    /**
     * @param tenantId the tenantId to set
     */
    public void setTenantId(TenantId tenantId) {
        this.tenantId = tenantId;
    }

    /**
     * @return the customerId
     */
    public CustomerId getCustomerId() {
        return customerId;
    }

    /**
     * @param customerId the customerId to set
     */
    public void setCustomerId(CustomerId customerId) {
        this.customerId = customerId;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the type
     */
    public String getType() {
        return type;
    }

    /**
     * @param type the type to set
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * @return the details
     */
    public String getDetails() {
        return details;
    }

    /**
     * @param details the details to set
     */
    public void setDetails(String details) {
        this.details = details;
    }
    
}
